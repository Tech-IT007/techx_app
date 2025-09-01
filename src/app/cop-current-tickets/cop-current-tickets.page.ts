import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ClintTicketsEditComponent } from "../clint-tickets-edit/clint-tickets-edit.component";

@Component({
  selector: 'app-cop-current-tickets',
  templateUrl: './cop-current-tickets.page.html',
  styleUrls: ['./cop-current-tickets.page.scss'],
})
export class CopCurrentTicketsPage implements OnInit {
  options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  closer: boolean;
  row: boolean;
  water: boolean;
  emp: any;
  img = true
  img2 = true
  toast: any;
  role: any;
  tea = true
  img22 = true
  hide = false
  temp: any;
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",


  };
  dataTo = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("username"),
    "Action": "pre_img"

  }
  cost = {
    "TicketID": localStorage.getItem("ID"),
  }

  valid_cost: any;
  costly: boolean;


  message: any;
  status_services = {
    Pending: "",
    "In Progress": "",
  };
  Asgin = {
    Name: localStorage.getItem("role"),
    ID: localStorage.getItem("ID")
  };
  services_data: any;
  use: any;
  otp: any;
  Branch_Tickets_Id: any;
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;
  profile: any
  test_variable: any;
  ID: any;

  // dataToSend = {
  //   TicketID: localStorage.getItem("ID")
  // }
  dataToSend = {
    TicketID: localStorage.getItem("ID"),
   
  }

  BookingID: any;

  impact: any = {};

  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
  deo: any;
  status: any;
  button = false
  date: any;
  show = false;
  isButtonDisabled11: boolean;
  add = false
  clickedImage: string;
  isButtonDisabled22: boolean;
  add2: boolean;
  clicked: string;
  isButtonDisabled33: boolean;
  clickedd: string;
  open3: boolean;
  open4: boolean;
  rol: string;
  Start_Work: boolean;
  Change_Ticket_Status: boolean;
  OTP_Genrate = {
    "TicketID": "",
    "TicketStatus": "Generate OTP to Start",
    "UpdatedBy": localStorage.getItem("workname"),
    "AssignedTo": "",
    "DueDate": ""
  }
  submit_For_closer: boolean;
  image: any;
  status_type: any;
  AMC_status: boolean;
  R_M_status: boolean;
  approvel: any;
  AMC_approvel_status: boolean;
  R_M_approvel_status: boolean;
  Raised_app: boolean;
  serve_status: any;
  Raised_open: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public popoverController: PopoverController,
    private camera: Camera,
    public loadingCtrl: LoadingController
  ) {

    this.detailsview();
    // this.advance_cost()
    this.role = localStorage.getItem("role")



  }

  ngOnInit() {





  }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
        this.OTP_Genrate.TicketID = params.BookingID;
        this.BookingID = params.BookingID
        console.log(this.BookingID)

      }

      this.Getdata();
      // this.Service_status()
      // this.Asginchange()
    })
  }
Getdata() {
  this.ngxService.start();

  const url = "https://techxpertindia.in/api/get_corporate_ticket_detail.php";
  this.http.post(url, this.dataToSend, {
    headers: new HttpHeaders({ "content-Type": "application/json" }),
  }).subscribe(
    (response: any) => {
      console.log(response);

      // Save Ticket ID
      this.ID = response.data.ID;
      localStorage.setItem("ID", this.ID);

      // Save Branch Ticket ID
      this.Branch_Tickets_Id = response.data.BranchID;
      localStorage.setItem("branch_tickets_id", this.Branch_Tickets_Id);

      // Ticket Details
      this.impact = response.data;
      this.temp = this.impact.length;

      // Show/hide when no data found
      this.show = this.temp === 0;

      // Get status & other details
      this.status = response.data.Status;
      this.status_type = response.data.Type;
      this.approvel = response.data.QuoteApproved;
      this.date = response.data.DueDate;

      // Store Due Date
      localStorage.setItem("Date", this.date);
      this.OTP_Genrate.DueDate = this.date;

      // Assigned employee
      this.emp = response.data.AssignedTo;
      localStorage.setItem("empl_ID", this.emp);
      this.OTP_Genrate.AssignedTo = this.emp;

      // Reset all button flags
      this.Change_Ticket_Status = false;
      this.Start_Work = false;
      this.closer = false;
      this.submit_For_closer = false;
      this.AMC_approvel_status = false;

      /** ----------------------------
       * BUTTON VISIBILITY LOGIC
       * ---------------------------- */

      if (this.status === 'Work In Progress') {
        this.submit_For_closer = true;
      } 
      else if (this.status === 'Closed') {
        this.closer = true;
      } 
      else if (this.status === 'Raised') {
        this.Change_Ticket_Status = true;
      } 
      else if (this.status === 'Assigned') {
        if (this.status_type !== "AMC" && this.approvel === "0") {
          this.AMC_approvel_status = true;
          this.Start_Work = false;
        } else {
          this.Start_Work = true;
        }
      }

      this.image = response.ticket_image;

      this.ngxService.stop();
    },
    (error) => {
      console.error("API Error:", error);
      this.ngxService.stop();
    }
  );
}




  Service_Change_Status() {
    this.ngxService.start()

    var url = "https://techxpertindia.in/api/change_booking_status.php";
    return this.http.post(url, this.bookingdata).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users;

      console.log(this.obj);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          BookingID: this.BookingID
        }
      }
      this.router.navigate(["rocket"], navigationExtras)
      this.ngxService.stop()
    });

  }


  //   proceed_to_english_action(){

  //     this.route.queryParams.subscribe(params => {
  //       this.userId = params.special;
  //     })

  //     let navigationExtras: NavigationExtras = {
  //      queryParams: {
  //        userId: this.userId
  //       }
  //      }
  //      this.router.navigate(['corprate-city-lead'], navigationExtras);
  //  }

  // route_to_profile_answer_screen(BookingID) {
  //   this.BookingID = BookingID;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID

  //     }

  //   }

  //   if (this.role == "Vendor" || this.role == "Technician") {
  //     this.router.navigate(['verfication-otp'], navigationExtras);

  //   } else {
  //   //  this.tea = false;
  //   //   this.hide = true;
  //     // this.router.navigate(['corpate-status'], navigationExtras);


  //   }

  // }
  // route_to_profile_answer_screen(BookingID) {
  //   this.BookingID = BookingID;
  //   console.log('BookingID:', this.BookingID); // Log the BookingID for debugging

  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID
  //     }
  //   };

  //   console.log('Role:', this.role); // Log the role for debugging

  //   if (this.role === "Vendor" || this.role === "Technician") {
  //     console.log('Navigating to verification-otp page with extras:', navigationExtras);
  //     this.router.navigate(['verification-otp'], navigationExtras);
  //   } else {
  //     console.log('Role does not match "Vendor" or "Technician", no navigation performed.');
  //     // Optionally handle a different scenario if needed
  //   }
  // }

  route_to_profile_answer_screen(BookingID) {
    this.ngxService.start()
    this.BookingID = BookingID;
    console.log('BookingID:', this.BookingID); // Log the BookingID for debugging

    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    };

    console.log('Role:', this.role); // Log the role for debugging

    // Split roles into an array
    let rolesArray = this.role.split(',');

    // Check if 'Technician' or 'Supervisor' is in rolesArray
    if (rolesArray.includes("City Lead")) {
      console.log('Navigating to verification-otp page with extras:', navigationExtras);
      this.router.navigate(['/corpate-status'], navigationExtras);
      this.ngxService.stop()
    } else if (rolesArray.includes("Technician") || rolesArray.includes("Vendor")) {
      var url = "https://techxpertindia.in/api/change_ticket_status.php";
      // return this.http.post(url, this.OTP_Genrate).subscribe((data) => {
      //   console.log(data)
    
      //   // this.router.navigate(['/verfication-otp'], navigationExtras);
      //    this.router.navigate(['/entry-checklist'], navigationExtras);
      //   this.ngxService.stop()
      //   console.log('Role does not include "Technician" or "Supervisor", no navigation performed.');
      // })
           this.router.navigate(['/entry-checklist'], navigationExtras);

      // Optionally handle a different scenario if needed
    } else {
      this.router.navigate(['/corpate-status'], navigationExtras);
    }
    this.ngxService.stop()
  }

  route_to_profile_closer(BookingID) {
    this.ngxService.start()
    this.BookingID = BookingID;
    console.log('BookingID:', this.BookingID); // Log the BookingID for debugging

    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    };
    this.router.navigate(['/technician'], navigationExtras);
  }
  captureImage() {
    this.isButtonDisabled11 = true
    this.add = true
    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImageToDataStore(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error
    });





  }

  saveImageToDataStore(imageData: string) {
    this.ngxService.start()
    this.dataTo.imageData = imageData;
    const postData = {
      data: this.dataToSend,
    };
    var url = "https://techxpertindia.in/api/get_capture_image.php"
    return this.http.post(url, postData).subscribe((data) => {
      console.log(data);
      (error) => {
        console.error('Error saving image:', error);
      }
      this.ngxService.stop()

    })


  }



  capture() {
    this.isButtonDisabled22 = true
    this.add2 = true
    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImageToData(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clicked = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error
    });





  }

  saveImageToData(imageData: string) {
    this.ngxService.start()
    this.dataTo.imageData = imageData;
    const postData = {
      data: this.dataToSend,
    };
    var url = "https://techxpertindia.in/api/get_capture_image.php"
    return this.http.post(url, postData).subscribe((data) => {
      console.log(data);
      (error) => {
        console.error('Error saving image:', error);
      }
      this.ngxService.stop()

    })


  }

  IMG() {
    this.isButtonDisabled33 = true

    console.log("helloo")
    const options: CameraOptions = {
      quality: 100,

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.saveImageTo(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedd = base64Image;

    }, (err) => {
      console.log(err);
      // Handle error
    });





  }

  saveImageTo(imageData: string) {
    this.ngxService.start()
    this.dataTo.imageData = imageData;
    const postData = {
      data: this.dataToSend,
    };
    var url = "https://techxpertindia.in/api/get_capture_image.php"
    return this.http.post(url, postData).subscribe((data) => {
      console.log(data);
      (error) => {
        console.error('Error saving image:', error);
      }

      this.ngxService.stop()
    })


  }




  click_to_next() {
    this.open3 = true
    this.add = false

  }


  click_to_next2() {
    this.open4 = true
    this.add2 = false

  }




  // route_to_profile_answer(BookingID) {
  //   this.BookingID = BookingID;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID

  //     }

  //   }
  //   if (this.role == "Vendor" || this.role == "Technician") {
  //     this.router.navigate(['verfication-otp'], navigationExtras);

  //   } else {

  //     this.router.navigate(['corpate-status'], navigationExtras);


  //   }

  // }


  // async Edit_Ticket_ID() {

  //   const popover = await this.popoverController.create({
  //     component: ClintTicketsEditComponent,
  //     cssClass: 'my-custom-class',
  //     backdropDismiss: true,
  //     translucent: true,
  //   });
  //   await popover.present();
  // }


  // advance_cost() {
  //   this.ngxService.start()
  //   var url = "https://techxpertindia.in/api/get_corporate_ticket_finance_by_ticketid.php";
  //   return this.http
  //     .post(url, this.cost, {
  //       headers: new HttpHeaders({ "content-Type": "application/json" }),
  //     })
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.valid_cost = data
  //       if (this.valid_cost.error == true || this.role == "Vendor" || this.role == "Technician") {
  //         this.costly = false
  //       } else {
  //         this.costly = true
  //       }
  //       this.ngxService.stop()




  //     }

  //     )
  // }










}

























































