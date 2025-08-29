import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, PopoverController, Platform } from "@ionic/angular";
import { PopoverComponent } from './popover/popover.component';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  users: any = [];
  temp: any = [];
  obj: any = [];
  version: any;
  appversion = '0.2';
  car: any;
  userid: any;





  Test = {
    "AwarenessId": ""
  }
  user: any = {
    "EmployeeID":  localStorage.getItem("EmployeeID")
    
  }
  name: any = {
    "name": ""
  };
  infiniteScroll: any;
  update: any;
  subscribe: any;

  constructor(private http: HttpClient, private router: Router ,public platform: Platform,  public popoverController: PopoverController,) {
    this.name = localStorage.getItem("workname");
    this.user.username = localStorage.getItem("workname");
  //   console.log(this.user.role);
if(localStorage.getItem("workname") == null){
 this.version_update()
}else{
  this.runHttp()
  this.version_update()
   
}


let a = 0;
this.subscribe =  this.platform.backButton.subscribeWithPriority(9999, () => {
  a++;
  if(this.constructor.name == "app")
  {
    if(a % 2 == 0){
    if(window.confirm("Do you want to exit App"))
    {
      navigator["app"].exitApp();
    }
  }
else if(a % 2 !== 0){
  {
    // this.router.navigateByUrl('/login-page');
  }
}}
})

   
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
  toogle() {

    alert("Are you sure ")



  }

  runHttp() {
    this.user.start_counter = 0;
    this.user.username = localStorage.getItem("name");
    var url = "https://techxpertindia.in/api/get_employee_info.php";
    console.log(this.user);
    return this.http.post(url, this.user, { headers: new HttpHeaders({ "content-Type": "application/json" }) })
      .subscribe(data => {
        console.log(data);
        this.users = data;
       this.users = this.users.data
       console.log(this.users)
      });
  }



  logout() {
    localStorage.removeItem("workname");

    this.router.navigate(["login"])
  }



  version_update() {
    var url = 'https://techxpertindia.in/api/get_user_app_version_new.php';
    return this.http.post(url, this.appversion).subscribe((data) => {
      console.log(data);
      console.log(data);
      this.update = data;
      console.log(this.update.version);
      this.version = this.update.version;
      console.log(this.version);
      
      this.onInit(1);
    });
  }

  async onInit(ev: any) {
    if (this.version > this.appversion) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        cssClass: 'my-custom-class',
        event: ev,
        backdropDismiss: false,
        translucent: true,
      });
      await popover.present();
    }
  }








}
