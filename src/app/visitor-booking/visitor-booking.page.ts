import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  PreloadAllModules,
  Router,
} from '@angular/router';
import { Camera ,CameraOptions} from '@ionic-native/camera/ngx';
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-visitor-booking',
  templateUrl: './visitor-booking.page.html',
  styleUrls: ['./visitor-booking.page.scss'],
})
export class VisitorBookingPage implements OnInit {





  
  
  options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  add_img:boolean = true
  row = false
  row1 = false
  view = false
  Service: any;
  temp_id: any;
  isButtonDisabled: boolean;
  isButtonDisabled1: boolean;
  isButtonDisabled2: boolean;
  isButtonDisabled3: boolean;
  add: boolean
  clickedImage :string
;
  disabled: any
  message: any;

  Corporat_service: any;
  Corporate_sub_service: any
  cop_service: any;
 
  toast: any;  
  testvar: any;
  userId: any;
 
  data = {
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "ObservationID": -1,
    "TempObservationID": -1,
    "CreatedBy": localStorage.getItem("workname"),
    "imageData": ""
  }
  data2 = {
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "ObservationID": -1,
    "TempObservationID":"",
    "CreatedBy": localStorage.getItem("workname"),
    "imageData": ""
  }

  userdetails: any = {
    "CreatedBy": localStorage.getItem("workname"),
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "Category":"",
    "Priority":"",
    "Observation":"",
    "CompanyRecommendation":"",
    "ClientRecommendation":"",
    "TempObservationID":localStorage.getItem("temp_ID")
   
  }
  clicked: string;
  clicked1: string;
  clicked2: string;
  sec: boolean;
  sec1: boolean;
  sec2: boolean;
  id: any;

  users: any;
  
  dataToSend:any = {
    category_name: ""
  }
  user: any;
  temp: any;
  constructor(
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public api: ApiService,
    public toastController: ToastController,
    private camera: Camera,
    public router: Router,
    public loadingCtrl: LoadingController
  ) { 
    this.userdetails.Priority = "Non Critical"
  }

  ngOnInit() {
   this.temp = localStorage.getItem("SiteVisitID")
    console.log(this.temp)
    this.data.SiteVisitID = this.temp
   this.allservice()
  }


  allservice() {
    var url = "https://techxpertindia.in/api/get_all_categories.php";
    return this.http.get(url).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.users = this.users.data;
      console.log(this.users);
    });
  }
  onSelectChange(event: any) {
    console.log(event.detail.value);
    this.userdetails.Category = event.detail.value;
    
  }


  submit() {

    this.ngxService.start();
    if (this.userdetails.Category == "") {

      this.toast = this.toastController

        .create({
          message: "Enter Your Message",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
        });
      this.ngxService.stop();
    }


    else {

  
      this.ngxService.start();

      var url =
        "https://techxpertindia.in/api/site_visits/submit_site_observation.php";

      console.log(this.userdetails);

      return this.http
        .post(url, this.userdetails, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((response) => {
          console.log(response);
          this.router.navigateByUrl("/visitor-all-tickets")    

          this.ngxService.stop();
        });
      
    }
  }


  captureImage() {

    // this.three = true
    console.log("helloo")
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImageToDataStore(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error




    });

  }

  saveImageToDataStore(imageData: string) {
     this.ngxService.start()
    this.data.imageData = imageData;
    const postData = {
      data: this.data

    };
    var url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php"
    return this.http.post(url, postData).subscribe((data) => {
      console.log(data);
      this.id = data;
      this.id = this.id.TempObservationID;
      console.log(this.id);
        this.data.SiteVisitID = localStorage.getItem("SiteVisitID")
      this.userdetails.TempObservationID = this.id
      this.data2.TempObservationID = this.id
      this.row = true
      this.isButtonDisabled = true;
      this.add = true;
      (error) => {
        console.error('Error saving image:', error);
      }
   
     this.ngxService.stop()
    })


  }

  capture() {
    

    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImageToData(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clicked = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error

    });


  }

  saveImageToData(imageData: string) {
    this.ngxService.start()
    this.data2.imageData = imageData;
    const postData = {
      data: this.data2
    };
    var url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php"
    return this.http.post(url, postData).subscribe((data) => {
      console.log(this.data);
      this.isButtonDisabled1 = true
      console.log(data);
      
  
      (error) => {
        console.error('Error saving image:', error);
      }
      this.ngxService.stop()

    })


  }



  capture1() {

    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImage(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clicked1 = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error

    });


  }

  saveImage(imageData: string) {
    this.ngxService.start()
    this.data2.imageData = imageData;
    const postData = {
      data: this.data2
    };
      var url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php"
    return this.http.post(url, postData).subscribe((data) => {
      this.view = true
      this.isButtonDisabled2 = true
      console.log(data);
      (error) => {
        console.error('Error saving image:', error);
      }

      this.ngxService.stop()
    })


  }



  capture2() {

    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.save(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clicked2 = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error

    });


  }

  save(imageData: string) {
    this.ngxService.start()
    this.data2.imageData = imageData;
    const postData = {
      data: this.data2
    };
    var url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php"
    return this.http.post(url, postData).subscribe((data) => {
      this.isButtonDisabled3 = true
      console.log(data);
     
      (error) => {
        console.error('Error saving image:', error);
      }

      this.ngxService.stop()
    })


  }

  click_to_next(){
    this.add = false
    this.sec = true
  }

  click_to_next1(){
    this.row = false
    this.sec1 = true
  }


  click_to_next2(){
    this.view = false
    this.sec2 = true
  }
}

























