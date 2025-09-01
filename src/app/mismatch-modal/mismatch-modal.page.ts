import { Component } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mismatch-modal',
  templateUrl: './mismatch-modal.page.html',
  styleUrls: ['./mismatch-modal.page.scss'],
})
export class MismatchModalPage {
  constructor(
    private modalCtrl: ModalController,
    public router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController // ✅ Add LoadingController
  ) {}

  userdetails = {
    "AssetsID": localStorage.getItem("AssetsID"),
    "UniqueCode": localStorage.getItem("assets_code")
  };

  async dismissModal() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      backdropDismiss: false
    });
    await loading.present(); // ✅ Show loader

    const api = "https://techxpertindia.in/api/banch-assets-qr-code/assign-assets-on-qr.php";

    this.http.post(api, this.userdetails).subscribe({
      next: async (response: any) => {
        console.log(response);

        await loading.dismiss(); // ✅ Dismiss loader

        // ✅ Show success toast message
        const toast = await this.toastCtrl.create({
          message: '✅ Your asset has been successfully mapped to this QR code.',
          duration: 3000,
          position: 'top',
          color: 'success'
        });
        await toast.present();

        // ✅ Close modal & navigate
        this.modalCtrl.dismiss();
        this.router.navigateByUrl("/barcode-info");
      },
      error: async (error) => {
        console.error('API Error:', error);

        await loading.dismiss(); // ✅ Dismiss loader

        // ❌ Show error toast
        const toast = await this.toastCtrl.create({
          message: '❌ Failed to map asset. Please try again.',
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
