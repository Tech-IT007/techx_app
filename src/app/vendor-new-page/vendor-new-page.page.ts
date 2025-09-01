import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Storage } from '@ionic/storage-angular';


declare let window: any;
let cordova: any;
@Component({
  selector: 'app-vendor-new-page',
  templateUrl: './vendor-new-page.page.html',
  styleUrls: ['./vendor-new-page.page.scss'],
})
export class VendorNewPagePage implements OnInit {
  out: any;
  in: any;
  role: any;
  status: boolean;
  vendor: boolean;
  employname: any;

  constructor(
    public router: Router,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private storage: Storage,
    private tts: TextToSpeech,
  ) {
    this.chckAppGpsPermission();
    this.checkPermissions()
  }
  currentTime: string;

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
  temp: any;
  la: any;
  log: any;
  toast: any;
  filterTerm: string;
  message: any;
  picks: any;

  Role: any;
  show: Boolean;
  ionViewWillEnter() {
    this.Status_role()
      this.att()
      this.vendor_roles()
      // this.speakWelcome()
  }
  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
     this. Status_role()
  }

  dataToSend: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };
  dash() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  router_to_homecare() {
    this.router.navigateByUrl('ppm-vendor-status');
  }



  Router_to_coporate() {
    this.router.navigateByUrl('dashboard');
  }

  // att(){
  //   this.router.navigateByUrl("attdenc-in")
  // }

  charge() {
    this.router.navigateByUrl('charge');
  }

  user() {
    this.router.navigateByUrl('rocket');
  }

  att() {
    this.ngxService.start();

    var url =
      'https://techxpertindia.in/api/get_employee_attendance_status.php';
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);

      this.out = data;
      this.out = this.out.OutTimeStatus;
      console.log(this.out);
      this.in = data;
      this.in = this.in.InTimeStatus;
      console.log(this.in);
        this.employname  = data 
        this.employname = this.employname.EmployeeName

      this.ngxService.stop();
    });
  }


  roles() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if (
        rolesArray.includes('Branch Account Manager') ||
        rolesArray.includes('City Corporate Lead') ||
        rolesArray.includes('Account Manager')
      ) {
        console.log('hello');
        this.router.navigateByUrl('/corporate-all-tickets');

        // Check if either 'Technician' or 'Vendor' is in rolesArray
      } else if (
        rolesArray.includes('Technician') ||
        rolesArray.includes('Vendor')
      ) {
        // this.router.navigateByUrl('/corprate-tickets');
        this.router.navigateByUrl('/all-ppm-tickest');
      }
    } else {
      console.error('No role found in localStorage');
    }
  }

  router_to_attendance() {
    const inStatus = this.in;
    const outStatus = this.out;
  
    console.log("inStatus:", inStatus);
    console.log("outStatus:", outStatus);
  
    if (inStatus == 1 && outStatus == 1) {  // Loose comparison
      console.log("Navigating to attendance_page");
      this.router.navigateByUrl('attendance');
    } 
    else if (inStatus == 1) {  // Loose comparison
      console.log("Navigating to attdenc-out");
      this.router.navigateByUrl('attdenc-out');
    } 
    else {
      console.log("Navigating to attdenc-in");
      this.router.navigateByUrl('attdenc-in');
    }
  }
  
  checkPermissions() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    result => {
      if (!result.hasPermission) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      }
    },
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  );
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
      if (canRequest) {
      } else {
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
        this.la = this.latitude;
        this.la = localStorage.setItem('latitude', this.la);
        this.la = localStorage.getItem('latitude');
        console.log(this.la);
        this.log = this.longitude;
        this.log = localStorage.setItem('longitude', this.log);
        this.log = localStorage.getItem('longitude');
        console.log(this.log);
        this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        // alert('Error getting location' + JSON.stringify(error));
      });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        // alert('Error getting location' + JSON.stringify(error));
      });
  }
  //Return Comma saperated address
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



  
  Status_role() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if (
        rolesArray.includes('Branch Account Manager') ||
        rolesArray.includes('City Corporate Lead') ||
        rolesArray.includes('Account Manager')
      ) {
        console.log('hello');
         this.status = false;

        // Check if either 'Technician' or 'Vendor' is in rolesArray
      } else if (
        rolesArray.includes('Technician') ||
        rolesArray.includes('Vendor')
      ) {
        // this.router.navigateByUrl('/corprate-tickets');
         this.status = true
      }
    } else {
      console.error('No role found in localStorage');
    }
  }
 
  vendor_roles() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if ( rolesArray.includes('Vendor')) {
        console.log('hello');
         this.vendor = false;
      }else {
        this.vendor = true;
      }
    } 
  }

async speakWelcome() {
  try {
    // Check mute status
    const isMuted = await this.storage.get('isMuted');
    if (isMuted) {
      console.log('Voice greeting is muted.');
      return;
    }

    // If employname is not set, skip speaking
    if (!this.employname) {
      console.warn('Employee name not available yet.');
      return;
    }

    // Set greeting based on time
    const currentHour = new Date().getHours();
    let greeting = '';

    if (currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour < 17) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }

    // Speak message
    await this.tts.speak({
      text: `${greeting} ${this.employname}! Welcome to Techxpert, enjoy your day!`,
      locale: 'en-US',
      rate: 0.9
    });

  } catch (error) {
    console.error('TTS Error:', error);
  }
}




async lougout() {
  //   try {
  //   // Speak only English
  //   await this.tts.speak({
  //     text: 'Thank you for using Techxpert, see you soon!',
  //     locale: 'en-US',
  //     rate: 0.9
  //   });
  // } catch (error) {
  //   console.error('TTS Error:', error);
  // }
  this.router.navigateByUrl("/login")
  localStorage.clear()
}
 
}
