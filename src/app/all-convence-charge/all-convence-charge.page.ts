import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-all-convence-charge',
  templateUrl: './all-convence-charge.page.html',
  styleUrls: ['./all-convence-charge.page.scss'],
})
export class AllConvenceChargePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController,
  ) { }

  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID")
  }
  role : any;
  city_lead  :any;
  temp: any;
  user: any;
  obj: any;
  users: any;
  userid: any;
  Test: any;
  ngOnInit() {
   this.runHttp()
  }

  runHttp() {

    this.ngxService.start()
   
    var url = "https://techxpertindia.in/api/get_employee_covenience.php"
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data
      
      console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.data.length
      console.log(this.temp)
      
   
      this.ngxService.stop()
    });
    
 
  }






}
