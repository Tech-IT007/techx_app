import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// ✅ Capacitor Camera
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

declare let window: any;
let cordova: any;

@Component({
  selector: 'app-attdenc-out',
  templateUrl: './attdenc-out.page.html',
  styleUrls: ['./attdenc-out.page.scss'],
})
export class AttdencOUTPage implements OnInit {
  currentTime: string;
  time = false;
  time2 = false;
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
  clicked: string;
  img_data: string;

  show = true;
  hidd = false;
  button = false;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public router: Router,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public toastController: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.run();
    this.chckAppGpsPermission();
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  ionViewWillEnter() {
    this.capture();
  }

  ngOnInit() {}

  // ✅ GPS Permission Check
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

  // ✅ Get current coordinates of device
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

  // ✅ Reverse Geocoding
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

  // ✅ Attendance status check
  run() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();

      const url =
        'https://techxpertindia.in/api/get_employee_attendance_status.php';
      return this.http.post(url, this.dataToSend).subscribe((data: any) => {
        console.log(data);

        this.temp = data.OutTimeStatus;
        console.log('OutTimeStatus:', this.temp);

        if (this.temp == '1') {
          this.hidd = true;
          this.show = false;
          this.button = false;
          this.time2 = true;
          this.time = false;
        } else {
          this.hidd = false;
          this.show = true;
          this.button = true;
          this.time = true;
          this.time2 = false;
        }

        if (data?.data?.attendace_records?.OutTime) {
          this.temp = data.data.attendace_records.OutTime;
          console.log('OutTime:', this.temp);
        }
      });
    });
  }

  // ✅ Punch Out Attendance
  async attdence_out() {
    if (!this.Attdence_Data.imageData) {
      await this.capture();
    } else {
      this.ngxService.start();

      const url =
        'https://techxpertindia.in/api/punch_out_employee_attendance.php';

      this.http.post(url, this.Attdence_Data).subscribe((data) => {
        console.log('Punch Out Response:', data);
        this.router.navigateByUrl('vendor-new-page');
        this.ngxService.stop();
      });
    }
  }

  // ✅ Capture Image using Capacitor Camera
  async capture() {
    console.log('Capturing image (Capacitor)...');

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // get base64 string
        source: CameraSource.Camera, // always open camera
      });

      if (image.base64String) {
        this.saveImageToData(image.base64String);
        this.clicked = 'data:image/jpeg;base64,' + image.base64String; // preview
      }
    } catch (err) {
      console.error('Error capturing image:', err);
    }
  }

  // ✅ Save image to data object
  saveImageToData(imageData: string) {
    console.log('Captured Image Base64 length:', imageData);
    this.img_data = imageData;
    this.Attdence_Data.imageData = this.img_data;
  }
}
