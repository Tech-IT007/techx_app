import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barcode-info',
  templateUrl: './barcode-info.page.html',
  styleUrls: ['./barcode-info.page.scss'],
})
export class BarcodeInfoPage implements OnInit {
  branch_view: any[] = [];
  filteredBranchList: any[] = [];
  assets_view: any[] = [];
  filteredAssetsList: any[] = [];
  selectedBranch: string = '';
  selectedBranchName: string = '';
  selectedAsset: string = '';
  selectedAssetName: string = '';

  userdetails = {
    BranchID: ''
  };

  constructor(
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router : Router
  ) {}

  ngOnInit() {
    this.all_branch();
  }

  /** ✅ Show Loader */
  async presentLoader(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',
      duration: 1500,
      translucent: true,
      cssClass: 'custom-loader'
    });
    await loading.present();
  }

  /** ✅ Show Toast */
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  /** ✅ Fetch Branch List */
  async all_branch() {
    await this.presentLoader('Loading branches...');
    const api = 'https://techxpertindia.in/api/get_all_branch.php';
    this.http.get(api).subscribe((response: any) => {
      this.branch_view = response.data || [];
      this.filteredBranchList = [...this.branch_view];
    });
  }

  /** ✅ Fetch Assets By Branch */
  async getBranchAssets(branchID: string) {
    this.userdetails.BranchID = branchID;

    const api = `https://techxpertindia.in/api/get_branch_assets.php`;
    this.http.post(api, this.userdetails).subscribe((response: any) => {
      this.assets_view = response.data || [];
      this.filteredAssetsList = [...this.assets_view];

      if (this.assets_view.length === 0) {
        this.presentToast('No assets found for this branch', 'warning');
      } else {
        this.presentToast('Assets loaded successfully', 'success');
      }
    });
  }

  /** ✅ Open Branch Action Sheet */
  async openBranchSelector() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Branch',
      buttons: [
        {
          text: '🔍 Search Branch',
          handler: () => {
            this.showBranchSearchModal();
          }
        },
        ...this.filteredBranchList.map((branch) => ({
          text: branch.BranchSite,
          handler: () => {
            this.selectedBranch = branch.ID;
            this.selectedBranchName = branch.BranchSite;
            this.selectedAsset = '';
            this.selectedAssetName = '';
            this.getBranchAssets(branch.ID);
          }
        })),
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  /** ✅ Open Asset Action Sheet */
  async openAssetSelector() {
    if (!this.selectedBranch) {
      this.presentToast('Please select a branch first', 'danger');
      return;
    }

    if (this.assets_view.length === 0) {
      this.presentToast('No assets available for this branch', 'warning');
      return;
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Asset',
      buttons: [
        {
          text: '🔍 Search Asset',
          handler: () => {
            this.showAssetSearchModal();
          }
        },
        ...this.filteredAssetsList.map((asset) => ({
          text: asset.EquipmentName,
          handler: () => {
            this.selectedAsset = asset.ID;
              localStorage.setItem("AssetsID",this.selectedAsset)
            this.selectedAssetName = asset.EquipmentName;
          }
        })),
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  /** ✅ Branch Search Modal */
  async showBranchSearchModal() {
    const search = prompt('Enter branch name:');
    if (search !== null) {
      this.filteredBranchList = this.branch_view.filter((branch) =>
        branch.BranchSite.toLowerCase().includes(search.toLowerCase())
      );
      this.openBranchSelector();
    }
  }

  /** ✅ Asset Search Modal */
  async showAssetSearchModal() {
    const search = prompt('Enter asset name:');
    if (search !== null) {
      this.filteredAssetsList = this.assets_view.filter((asset) =>
        asset.EquipmentName.toLowerCase().includes(search.toLowerCase())
      );
      this.openAssetSelector();
    }
  }

  continue() {
   this.router.navigateByUrl("/barcode-scanning")
  }
}
