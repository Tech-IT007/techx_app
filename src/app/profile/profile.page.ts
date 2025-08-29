import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
statu : any 
serve: any;
button = false
  status_hide : boolean ;
  toast: any;
  temp: any;
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
  };
  Start_work:boolean;
  complet_work :boolean; 
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

  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;

  test_variable: any;
  ID: any;
  dataToSend = {
    BookingID: ""
  }

  BookingID: any;

  impact: any = {};
status :any
  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
show = false;
 self = true
  role: any;
  WIP: boolean;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();

  }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.role)
  }
  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.BookingID = params.BookingID;

        this.BookingID = params.BookingID
        console.log(this.BookingID)

      }

      this.Getdata();
  
    })
  }
  Getdata() {
    

    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/get_booking_details.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response
        console.log(this.ID)
        this.ID = this.ID.data.ID
        this.ID = localStorage.setItem("ID", this.ID)
        this.ID = localStorage.getItem("ID")
       
        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact)
        if(this.temp == "0"){
          this.show = true 
        
        }else{
          this.show = false
        }
        this.serve = response 
        this.serve = this.serve.data.Status
        console.log(this.serve)
       this.serve = localStorage.setItem("Status_value",this.serve)
       this.serve = localStorage.getItem("Status_value")   
         
        if(this.serve === "Closed" ){
          this.button = false;
          this.complet_work = true;
          this.Start_work = false;
          this.WIP = false;
        }else{
          this.button = true;
          this.Start_work = true;
          this.complet_work = false;
          this.WIP = false;
        }
        if(this.serve == "Work In Progress"){
         this.WIP = true;
        this.complet_work = false;
        this.Start_work = false
        }




      });
      
    }, 100);
  }


  route_to_profile_answer_screen(BookingID) {
    this.BookingID = BookingID;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }


    if (this.role == "Vendor" || this.role == "Technician") {
      this.router.navigate(['verified-home-care'], navigationExtras);
  
    } else {
    //  this.tea = false;
    //   this.hide = true;
      this.router.navigate(['assig-page'], navigationExtras);
  
  
    }
   
  }


  route_to_profile(BookingID) {
    this.BookingID = BookingID;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }



      this.router.navigate(['assig-page'], navigationExtras);
  
  
    
   
  }

}

























































