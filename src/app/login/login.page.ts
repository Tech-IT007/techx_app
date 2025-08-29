
import { Component, OnInit } from "@angular/core";
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavigationExtras, Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  password: string;
  showPassword: boolean = false;
  services_role: any;

  togglePasswordVisibility() {
    
    this.showPassword = !this.showPassword;
  }
  CorporateID: any;
  userdetails = {
    username: "",
    password: "",
  };
  print: any;
  userid: any;
  users: any;
  toast: any;
  testvar: any;
  userId: any;
  data: any;
  login_authentication: any;
  message: any;
  UserType: any;
  corprate_user_name: any;
  EmployeeID: any;
  role: any;
  BranchID: any;
  constructor(private http: HttpClient, public toastController: ToastController,
    public router: Router,
    
    private ngxService: NgxUiLoaderService,
    public loadingCtrl: LoadingController) {
      this.username = localStorage.getItem("workname")
      console.log(this.username)
    if (localStorage.getItem("workname")) {
      
      this.router.navigate(["/vendor-new-page"],)
    } else {
      this.router.navigate(["login"])
    }


  }
  username:any
  ngOnInit() {


   

  }
  submit() {
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();


    if ((this.userdetails.username == "" || this.userdetails.password == "")) {

      this.toast = this.toastController
        .create({
          message: "Plese Enter your Credentials",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
        });
    }

    else {

      var url =
        "https://techxpertindia.in/api/login.php";
      console.log(this.userdetails);


      return this.http
        .post(url, this.userdetails, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((response) => {

          console.log(response);


          this.testvar = response;

          this.login_authentication = response
          this.login_authentication = this.login_authentication.error
          this.message = response
          this.message = this.message.message

          if (this.login_authentication === true) {

            this.toast = this.toastController
              .create({
                message: this.message,
                duration: 2000,
              })
              .then((toastData) => {
                console.log(toastData);
                toastData.present();
              });

            this.router.navigate(["/login"],)
          }
          else {
            this.UserType = response
            this.UserType = this.UserType.data.UserType;
            if (this.UserType == "Corporate Branch User" || this.UserType == "Corporate Admin") {
              this.toast = this.toastController
                .create({
                  message: "User Dont have the access to Work app!",
                  duration: 2000,
                })
                .then((toastData) => {
                  console.log(toastData);
                  toastData.present();
                });

              this.router.navigate(["/login"],)



            } else {

              this.toast = this.toastController
                .create({
                  message: this.message,
                  duration: 2000,
                })
                .then((toastData) => {
                  console.log(toastData);
                  toastData.present();
                });

              this.router.navigate(["/login"],)

              this.EmployeeID = response
              this.EmployeeID = this.EmployeeID.data.EmployeeID
              console.log(this.EmployeeID)
              this.EmployeeID = localStorage.setItem("EmployeeID", this.EmployeeID)
              this.EmployeeID = localStorage.getItem("EmployeeID")
              this.corprate_user_name = response
              this.corprate_user_name = this.corprate_user_name.data.UserName
              this.corprate_user_name = localStorage.setItem("workname", this.corprate_user_name)
              this.corprate_user_name = localStorage.getItem("workname")
              console.log(this.corprate_user_name)

              this.CorporateID = response;
              this.CorporateID = this.CorporateID.data.CorporateID
              this.CorporateID = localStorage.setItem("CorporateID", this.CorporateID)
              this.CorporateID = localStorage.getItem("CorporateID")
              console.log(this.CorporateID)
              this.BranchID = response;
              this.BranchID = this.BranchID.data.BranchID
              this.BranchID = localStorage.setItem("BranchID", this.BranchID)
              this.BranchID = localStorage.getItem("BranchID")
              console.log(this.BranchID)
              this.role = response
              this.role = this.role.data.role.EmployeeRoles
            //  const employeeRoles = this.role
            //  employeeRoles.forEach(employe_role=>{
            //   // console.log(employe_role)
            //    this.services_role = employe_role
            //    console.log(this.services_role)

            //  })
              console.log(this.role)
                
          

              // alert(this.role)
              this.role = localStorage.setItem("role", this.role)
              this.role = localStorage.getItem("role")
              

              // alert(this.role)


              this.router.navigate(["/vendor-new-page"],)

          
            
                this.router.navigate(["vendor-new-page"],);
               
             

            }






          }


        })


    }

  }, 100);


  }
}







                                                                






















