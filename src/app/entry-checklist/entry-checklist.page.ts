import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-entry-checklist',
  templateUrl: './entry-checklist.page.html',
  styleUrls: ['./entry-checklist.page.scss'],
})
export class EntryChecklistPage implements OnInit {

  OTP_Genrate = {
    "TicketID": localStorage.getItem("CameraID"),
    "TicketStatus": "Generate OTP to Start",
    "UpdatedBy": localStorage.getItem("workname"),
    "AssignedTo": localStorage.getItem("empl_ID"),
    "DueDate": ""
  }
  url = "https://techxpertindia.in/api/change_ticket_status.php";
  apiChecklistUrl = 'https://techxpertindia.in/api/technician-safety-checks.php';
  apiUploadUrl = "https://techxpertindia.in/api/get_capture_image.php"

  // Checklist fields configuration
  checklistFields = [
    { key: 'Is_Uniform', label: 'Are you wearing the company uniform?' },
    { key: 'Has_Jacket', label: 'Are you wearing your safety jacket?' },
    { key: 'Has_Toolkit_Isolated', label: 'Do you have your insulated toolkit?' },
    { key: 'Has_Safety_Shoes', label: 'Are you wearing approved safety shoes?' },
    { key: 'Has_Ppe_Kit', label: 'Do you have your full PPE kit available?' }
  ];

  userdetails: any = {
    TicketID: localStorage.getItem("CameraID"),
    Is_Uniform: '',
    Has_Jacket: '',
    Has_Toolkit_Isolated: '',
    Has_Safety_Shoes: '',
    Has_Ppe_Kit: ''
  };

  user_data = {
    imageData: "",
    TicketID: localStorage.getItem("CameraID"),
    Action: ""
  }

  images: any = {};

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private camera: Camera,
    private ngxService: NgxUiLoaderService,
    public router: Router,
  ) { }

  /** Handle YES/NO selection */
  async onChoice(field: string, value: string) {
    this.userdetails[field] = value;

    if (value === 'YES') {
      await this.captureImage(field);
    } else {
      this.images[field] = '';
    }
  }

  /** Capture image and upload */
  async captureImage(field: string) {
    try {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit: false,        // ✅ Disable editing/cropping
        saveToPhotoAlbum: false, // ✅ Don't save to gallery
        cameraDirection: 1       // ✅ 1 = Front camera
      };

      const imageData = await this.camera.getPicture(options);

      this.images[field] = 'data:image/jpeg;base64,' + imageData;

      // Upload image to API
      this.user_data.imageData = imageData
      this.user_data.Action = field
      const payload = {
        data: this.user_data
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      await this.http.post(this.apiUploadUrl, payload, { headers }).subscribe((data) => {
        console.log(data)
      })
    } catch (error) {
      this.userdetails[field] = 'NO';
      this.images[field] = '';
      this.showToast('⚠️ Camera cancelled');
    }
  }

  /** Submit checklist */
  async submitChecklist() {
    // ✅ Validate all fields
    for (let field of this.checklistFields) {
      if (!this.userdetails[field.key]) {
        this.showToast(`⚠️ Please select "${field.label}"`);
        return;
      }
    }

    // ✅ Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Submitting checklist...'
    });
    await loading.present();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const payload = {
      TicketID: this.userdetails.TicketID || '', // use actual TicketID if available
      ...this.userdetails
    };

    // ✅ Submit checklist API
    this.http.post(this.apiChecklistUrl, payload,).subscribe(
      async (res: any) => {

  const url = "https://techxpertindia.in/api/change_ticket_status.php";

          this.ngxService.start(); // start loader for second API

          this.http.post(url, this.OTP_Genrate).subscribe(
            (data: any) => {
              this.ngxService.stop();
              console.log('Change Status Response:', data);
               this.router.navigateByUrl('/verfication-otp');
            },
              
          );





        await loading.dismiss();

        // ✅ Check strict 'error === "false"'
        if (res.error === 'false') {
          this.showToast('✅ Checklist submitted successfully');

          // ✅ Hit change_ticket_status.php API after successful checklist submission
        

        }
      },
      
    );
  }


  /** Show toast message */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top'
    });
    toast.present();


  }

  ngOnInit() { }
}
