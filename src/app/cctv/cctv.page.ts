
import { Component, ElementRef, OnInit, ViewChild ,Input} from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cctv',
  templateUrl: './cctv.page.html',
  styleUrls: ['./cctv.page.scss'],
})
export class CCTVPage implements OnInit {
  @Input() maxStars = 5; // Default stars
  rating = 0; // Current rating
  stars: number[] = [];

  view_data  :any = {}
  @ViewChild('signaturePad', { static: true }) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;

  constructor(public router: Router,
    public http: HttpClient, public toastController: ToastController,) {
   this.stars = Array(this.maxStars).fill(0);
    this.all_services_report()
  }

  button: boolean

  user_id = {
    "TicketID": localStorage.getItem("ID"),
  }
  userdetails: any = {
    "ProblemReportedByClient": "",
    "Remarks": "",
    "AssetCondition": "",
    "ClientRepresentative": "",
    "ClientRepresentativeContact": "",
    "ClientRepresentativeEmails": "",
    "ClientRepresentativeDesignation": "",
    "Observation": "",
    "ActionTaken":"",
     "CheckFunctionalityOfDvrNvr": "",
  "CheckFunctionalityOfIndoorCameras": "",
  "CheckFunctionalityOfOutdoorCameras": "",
  "CheckPowerSupplyOfSystem": "",
  "CheckWiringAndConnectivity": "",
  "CheckHddFunctionality": "",
  "CheckQualityForFocusOfCamera": "",
  "CheckMouseAvailability": "",
  "CheckFunctioningOfPoeSwitch": "",
  "CheckConditionOfBncRj45Connectors": "",
  "CleaningOfCameraIfRequired": "",
  "CheckTotalCountOfCameras": "",
  "CheckSurroundingsExternalInternal": "",
    "ServiceReportID": localStorage.getItem("Genral_services_report"),
    "ServiceReportTicketID": localStorage.getItem("ID"),
    "EquipmentDetails":"",
    "SerialNo":"",
    "Capacity":"",
    "RefrigerantType":"",
     "MakeModel":"",
    "CreatedBy": "admin",
    "Latitude": localStorage.getItem("latitude"),
    "Longitude": localStorage.getItem("longitude")
  };
  toast: any;

  hidd_pad: boolean = true;
  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.cctv_datashow ()
  }
hvac_data = {
   "TicketID": localStorage.getItem("ID"),
}

  sign = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "GeneralServiceReportID": localStorage.getItem("Genral_services_report"),
  }
  clearSignature() {
    this.signaturePad.clear();
    this.isButtonDisabled_save = false;
  }
 setRating(value: number) {
    this.rating = value;
  }

  goBack() {
    this.router.navigateByUrl("/technician")

  }
  saveSignature() {


    this.hidd_pad = false;
    const signatureData = this.signaturePad.toDataURL();

    if (signatureData.startsWith('data:image/png;')) {
      // const base64String = signatureData.replace('data:image/png;', '');
      // const base64Url = 'data:image/png;' + base64String;
      const base64String = signatureData.replace('data:image/png;base64,', ''); // Remove 'data:image/png;base64,' prefix
      console.log(base64String);

      this.sign.imageData = base64String
      this.toast = this.toastController
        .create({
          message: "Customer Signature updated",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
        });



      var url = "https://techxpertindia.in/api/capture_customer_signature.php"
      return this.http.post(url, this.sign).subscribe((data) => {

        console.log(data)
        this.button = true;


      })


    }
  }

  submit() {

    var url = "https://techxpertindia.in/api/ppm_tickets/post_cctv_service_report.php"
    return this.http.post(url, this.userdetails).subscribe((data) => {
      console.log(data)
      this.Contact = data
      this.Contact = this.Contact.ClientRepresentativeContact


      this.router.navigateByUrl("technician")
    })
  }

  all_services_report() {
    var url = "https://techxpertindia.in/api/get_general_service_report_details.php"
    return this.http.post(url, this.user_id).subscribe((data) => {
      console.log(data)
      this.Contact = data
      this.Contact = this.Contact.ClientRepresentativeContact
      //  this.userdetails.ClientRepresentativeContact = this.Contact
      this.ReportedByClient = data
      this.ReportedByClient = this.ReportedByClient.ProblemReportedByClient
      this.userdetails.ProblemReportedByClient = this.ReportedByClient
      this.ClientRepresentative = data
      this.ClientRepresentative = this.ClientRepresentative.ClientRepresentative
      //  this.userdetails.ClientRepresentative = this.ClientRepresentative
      this.Observation = data
      this.Observation = this.Observation.Observation
      this.userdetails.Observation = this.Observation
      this.ActionTaken = data
      this.ActionTaken = this.ActionTaken.ActionTaken
      // this.userdetails.ActionTaken = this.ActionTaken
      this.clint_data = data;
      console.log(this.clint_data)
    })
  }

  cctv_datashow (){
    
    var url = "https://techxpertindia.in/api/get_cctv_service_report_details.php"
    return this.http.post(url , this.hvac_data).subscribe((data)=>{
       console.log(data)
    this.view_data = data 
      this.view_data = this.view_data
    })
  }
}




























