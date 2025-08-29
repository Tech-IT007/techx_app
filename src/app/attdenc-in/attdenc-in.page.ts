import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// Capacitor Camera import
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';

declare let window: any;
let cordova: any;

@Component({
  selector: 'app-attdenc-in',
  templateUrl: './attdenc-in.page.html',
  styleUrls: ['./attdenc-in.page.scss'],
})
export class AttdencINPage implements OnInit {
  currentTime: string;

  temp: any;
  la: any;
  log: any;
  toast: any;
  filterTerm: string;
  message: any;
  picks: any;

  dataToSend = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };

  Attdence_Data: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
    Latitude: localStorage.getItem('latitude'),
    Longitude: localStorage.getItem('longitude'),
    imageData: '',
  };

  // Readable Address
  address: any;

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  set: any;
  service_id: any;
  clickedImages: any;

  data: any = {
    imageData: '',
    CreatedBy: 'admin',
    TempImageID: '',
    Action: 'Raise Ticket',
  };

  clicked: string;
  img: any;
  img_data: any;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public router: Router,
    public toastController: ToastController,
    private platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.chckAppGpsPermission();
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

   async ngOnInit() {
    this.capture(); // capture on load
    await Camera.requestPermissions({ permissions: ['camera'] });
  }

  chckAppGpsPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            this.requestToSwitchOnGPS();
          } else {
            this.askGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }


  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (!canRequest) {
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            (error) => {
              alert(error);
            }
          );
      }
    });
  }

  requestToSwitchOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          this.getGeolocation();
        },
        (error) => alert(JSON.stringify(error))
      );
  }

  //Get current coordinates of device
  getGeolocation() {
    this.ngxService.start();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.accuracy = resp.coords.accuracy;

        localStorage.setItem('latitude', String(this.latitude));
        localStorage.setItem('longitude', String(this.longitude));

        console.log('Latitude:', this.latitude);
        console.log('Longitude:', this.longitude);

        this.getGeoencoder(this.latitude, this.longitude);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });
  }

  //geocoder method to fetch address from coordinates
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        console.error('Error getting geocode', error);
      });
  }

  //Return Comma separated address
  generateAddress(addressObj) {
    let obj = [];
    let address = '';
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) address += obj[val] + ', ';
    }
    this.ngxService.stop();
    return address.slice(0, -2);
  }

  loc() {
    window.location.reload();
  }

  raja() {
    if (window.cordova) {
      cordova.plugins.diagnostic.switchToLocationSettings();
    }
  }

  async attdence_in() {
    if (!this.Attdence_Data.imageData) {
      await this.capture();
    } else {
      const url =
        'https://techxpertindia.in/api/punch_in_employee_attendance.php';
     this.ngxService.start();
      this.http.post(url, this.Attdence_Data).subscribe((data) => {
        console.log('Attendance submitted:', data);
        this.router.navigateByUrl('vendor-new-page');
        this.ngxService.stop();
      });
    }
  }

  // Capture Image using Capacitor Camera
  async capture() {
    console.log('Capturing image (Capacitor)...');

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // get base64 string
        source: CameraSource.Camera, // directly open camera
       direction: CameraDirection.Front  
      });

      const base64Data = image.base64String;
      console.log(base64Data)
      if (base64Data) {
        this.saveImageToData(base64Data);
        this.clicked = 'data:image/jpeg;base64,' + base64Data; // for preview
      }
    } catch (err) {
      console.error('Error capturing image:', err);
    }
  }

  saveImageToData(imageData: string) {
    console.log('Image data length:', imageData);
    this.img_data = imageData;
    this.Attdence_Data.imageData = this.img_data;
  }
}
