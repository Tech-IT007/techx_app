
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-tseting23',
  templateUrl: './tseting23.page.html',
  styleUrls: ['./tseting23.page.scss'],
})
export class Tseting23Page implements OnInit {
  impact: any = {}
  ppm: any = {}
  scannedData: any;

  constructor(private http :HttpClient ,  private barcodeScanner: BarcodeScanner,  private ngxService: NgxUiLoaderService,) {}

  ngOnInit() {
    this.Getdata()
    
  }
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
     "Status"   :  ""

  }
  Getdata() {
    
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

    var url = "https://techxpertindia.in/api/dashboard/get_employee_dashboard_stats.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
      
        this.impact = response;
        this.impact = this.impact.data.Corporate
        console.log(this.impact)
       
        this.ppm = response;
        this.ppm = this.ppm.data.PPM
        console.log(this.ppm)
      });
    }, 100);
}

scanCode() {
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.scannedData = barcodeData;
  }).catch(err => {
    console.log('Error', err);
  });
}


}



