
import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { PopoverComponent } from "../popover/popover.component";

import { ActivatedRoute } from "@angular/router";
import { el } from "@fullcalendar/core/internal-common";
@Component({
  selector: 'app-corprate-tickets',
  templateUrl: './corprate-tickets.page.html',
  styleUrls: ['./corprate-tickets.page.scss'],
})
export class CorprateTicketsPage implements OnInit {
  serach : boolean
  BookingID: any;
  branchSearch = '';
filteredBranches = [];
  buttonColor: any;
  button1Color: string = 'blue';
  update: any;
  searchTerm: string;
  b_status: any;
  branch_view: any;
  filter_show: boolean;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.runHttp ()
    }, 2000);
  }
  status_data = {
    "CorporateID": localStorage.getItem("CorporateID"),

  }
   
  account_ticket = false;
  version: any;
  appversion = '9.7';
  car: any;
  show = false; 
  role : any;
   city_lead  :any;
  temp: any;
  user: any;
  obj: any;
  users: any;
  userid: any;
  Test: any;
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
     "Status" :"",
     "start_counter":0,
     "no_of_records" :50000,
  }

  dataToSend_to_branch = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
     "Status" :"",
     "BranchID": "",
     "start_counter":0,
     "no_of_records" :50000,
  }


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController,
  ) {

    this.all_status ()
    this.branch_show ()
    interface PopoverOptions {
      component: any;
      componentProps?: { [key: string]: any };
      showBackdrop?: false;
      backdropDismiss?: false;
      translucent?: boolean;
      cssClass?: 'my-custom-class';
      event?: Event;
      animated?: boolean;

      mode?: 'ios' | 'md';
      keyboardClose?: boolean;
      id?: string;
    }

  }
  ionViewWillEnter() {
    this.runHttp()
    this.all_status ()
  }
  ngOnInit() {
    
    this.role = localStorage.getItem("role")
    
   
    this.role = this.role 

    console.log(this.role)

    if(this.role.includes("City Corporate Lead")){

      this.city_lead = true
     }

   else{
    this.city_lead = false
   }

if (this.role.includes ("Account Manager")){
  this.account_ticket = true;
}
    else{
      this.account_ticket = false
    }
    

    this.runHttp()
  }


  all_status (){
    var url = "https://techxpertindia.in/api/get_corporate_status_list.php";

    return this.http.post(url,this.status_data).subscribe((data)=>{
    console.log(data)
    this.b_status = data
    console.log(this.b_status )
    })
    
    }

    onSelect(event: any){
      console.log(  event.detail.value); 
    //  this.dataToSend.BranchID = event.detail.value
      this.dataToSend.Status = event.detail.value
      
      var url = "https://techxpertindia.in/api/get_assigned_corporate_tickets_v2.php";
      return this.http.post(url, this.dataToSend_to_branch).subscribe((data) => {
        console.log(data);
        this.users = data;
     this.runHttp()
      });
    
    }
  

    
 onSelect_branch(event: any) {
  const branchId = event.detail.value;
  console.log("Selected Branch ID:", branchId); 

  // Assign branch ID to your data object
  this.dataToSend_to_branch.BranchID = branchId;

  // API URL
  const url = "https://techxpertindia.in/api/get_assigned_corporate_tickets_v2.php";

  // Call API
  return this.http.post(url, this.dataToSend_to_branch).subscribe((data) => {
    console.log("Branch ID (inside subscription):", branchId); 
    console.log("API Response:", data);

    // Store response
    this.users = data;
     this.runHttp()
    // Run additional function
 
  });
}




  runHttp() {
    this.ngxService.start()
    this.user = localStorage.getItem("phonenumber");
    console.log(this.user)
    var url = "https://techxpertindia.in/api/get_assigned_corporate_tickets_v2.php"
    return this.http.post(url, this.dataToSend_to_branch).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data
      
      console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.data.length
      console.log(this.temp)
      
      if(this.temp == "0"){
        this.show = true ;
      this.serach = false;
      }else{
        this.show = false;
        this.serach = true;
      }
      this.ngxService.stop()
    });
    
 
  }


  route_to_profile_answer_screen(userID) {
    this.BookingID = userID;
    localStorage.setItem("CameraID",this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
    

      }
    }
    this.router.navigate(['cop-current-tickets'], navigationExtras);
  }



  changeButtonColor(buttonNumber: number) {
  if (buttonNumber === 1) {
    this.button1Color = 'red'; // Change to the desired color for Button 
}
  
  
}
  
  
// Http() {
//   var url = 'https://techxpertindia.in/api/get_user_app_version_vendor_app.php';
//   return this.http.post(url, this.appversion).subscribe((data) => {
//     console.log(data);
//     console.log(data);
//     this.update = data;
//     console.log(this.update.version);
//     this.version = this.update.version;
//     console.log(this.version);
//     this.onInit(1);
//   });
// }

// async onInit(ev: any) {
//   if (this.version > this.appversion) {
//     const popover = await this.popoverController.create({
//       component: PopoverComponent,
//       cssClass: 'my-custom-class',
//       event: ev,
//       backdropDismiss: false,
//       translucent: true,
//     });
//     await popover.present();
//   }
// }

loadData(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();

    this. dataToSend_to_branch.start_counter = this.dataToSend_to_branch.start_counter + 0;
    var url =  "https://techxpertindia.in/api/get_assigned_corporate_tickets.php"
  console.log(this.user);
  return this.http.post(url,this.dataToSend_to_branch ,{headers:new HttpHeaders({"content-Type":"application/json"})})
  .subscribe(data => {
    console.log(data);
    this.users = data;
    this.temp = this.users.data;
    this.obj = this.obj.concat(this.temp);
    console.log(this.obj);
  
  });

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
  
  }, 500);
}



doRefresh(event) {
  console.log('Begin async operation');
 this.runHttp()

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
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
      this.router.navigateByUrl('/all-ppm-tickest');
    }
  } else {
    console.error('No role found in localStorage');
  }
}



branch_show (){
  var api = "https://techxpertindia.in/api/get_all_branch.php"
  return this.http.get(api).subscribe((response)=>{
    console.log(response)
     this.branch_view =  response
     this.branch_view = this.branch_view.data
  })
}

filter_outline(){
  this.filter_show = true
}











  }




















