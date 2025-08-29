import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  toast: any;

  message: any;

  tip: any;
  city = "India"
  State = "Uttar Pradesh"

  userId: any;
  Test: any;
  view: any = {};

  Users: any;
  impact_data: any;

  test_variable: any;

  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID")
  }
  UpdateProfile = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
    "employee_contact": localStorage.getItem("phonenumber"),
    "employee_aadhar_number":"",
    "bank_account_number":"",
    "employee_name": "",
    "employee_email": "",
    "bank_account_name":"",
    "employee_pan_number":"",
    "City": "Noida",
    
  }

  impact: any = {};

  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    private ngxService: NgxUiLoaderService
  ) {
    this.detailsview();

  }

  ngOnInit() {
    this.tip = localStorage.getItem("phonenumber");
    console.log(this.tip)

  }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.userId) {
        this.dataToSend.EmployeeID = params.userId;
      }

      console.log(this.dataToSend);

      this.Getdata();

    })
  }
  Getdata() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
      this.users = localStorage.getItem("phonenumber");
      console.log(this.users)

      var url = "https://techxpertindia.in/api/get_employee_info.php";
      return this.http
        .post(url, this.dataToSend, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((response) => {
          console.log(response);
          this.impact = response;
          this.impact = this.impact.data;
          console.log(this.impact);
        });
    }, 
   100);
  }
  user(user: any) {
    throw new Error("Method not implemented.");
  }




  submit() {
   

      this.toast = this.toastController
        .create({
          message: "Details updated",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
        });
      var url = "https://techxpertindia.in/api/update_tx_customer_details.php"
      console.log(this.UpdateProfile)

      return this.http.post(url, this.UpdateProfile, { headers: new HttpHeaders({ "content-Type": "application/json" }) })
        .subscribe((data) => {
          console.log(this.dataToSend);
          this.Users = data;
          this.Users = this.Users.data;
          console.log(this.dataToSend);
          setTimeout(() => {
            location.reload();
          }, 100);
          this.router.navigate(["home"],);
        })


    }







    // else {




    //   this.toast = this.toastController
    //     .create({
    //       message: "Empty Fields",
    //       duration: 2000,
    //     })
    //     .then((toastData) => {
    //       console.log(toastData);
    //       toastData.present();
    //     });

    // }




  }





















