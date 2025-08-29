import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'past',
    loadChildren: () => import('./past/past.module').then( m => m.PastPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'status',
    loadChildren: () => import('./status/status.module').then( m => m.StatusPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rocket',
    loadChildren: () => import('./rocket/rocket.module').then( m => m.RocketPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'corprate-tickets',
    loadChildren: () => import('./corprate-tickets/corprate-tickets.module').then( m => m.CorprateTicketsPageModule)
  },
  {
    path: 'cop-current-tickets',
    loadChildren: () => import('./cop-current-tickets/cop-current-tickets.module').then( m => m.CopCurrentTicketsPageModule)
  },
  {
    path: 'tickets-view',
    loadChildren: () => import('./tickets-view/tickets-view.module').then( m => m.TicketsViewPageModule)
  },
  {
    path: 'corprate-past-tickets',
    loadChildren: () => import('./corprate-past-tickets/corprate-past-tickets.module').then( m => m.CorpratePastTicketsPageModule)
  },
  {
    path: 'city-tickets',
    loadChildren: () => import('./city-tickets/city-tickets.module').then( m => m.CityTicketsPageModule)
  },
  {
    path: 'corprate-city-lead',
    loadChildren: () => import('./corprate-city-lead/corprate-city-lead.module').then( m => m.CorprateCityLeadPageModule)
  },
  {
    path: 'home-city-lead',
    loadChildren: () => import('./home-city-lead/home-city-lead.module').then( m => m.HomeCityLeadPageModule)
  },
  {
    path: 'assig-page',
    loadChildren: () => import('./assig-page/assig-page.module').then( m => m.AssigPagePageModule)
  },
  {
    path: 'corpate-status',
    loadChildren: () => import('./corpate-status/corpate-status.module').then( m => m.CorpateStatusPageModule)
  },
  {
    path: 'home-complet-tickets',
    loadChildren: () => import('./home-complet-tickets/home-complet-tickets.module').then( m => m.HomeCompletTicketsPageModule)
  },
  {
    path: 'vendor-new-page',
    loadChildren: () => import('./vendor-new-page/vendor-new-page.module').then( m => m.VendorNewPagePageModule)
  },
  {
    path: 'attdenc-in',
    loadChildren: () => import('./attdenc-in/attdenc-in.module').then( m => m.AttdencINPageModule)
  },
  {
    path: 'attdenc-out',
    loadChildren: () => import('./attdenc-out/attdenc-out.module').then( m => m.AttdencOUTPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then( m => m.TestingPageModule)
  },
  {
    path: 'ppm-tickets',
    loadChildren: () => import('./ppm-tickets/ppm-tickets.module').then( m => m.PpmTicketsPageModule)
  },
  {
    path: 'ppm-assgine-status',
    loadChildren: () => import('./ppm-assgine-status/ppm-assgine-status.module').then( m => m.PpmAssgineStatusPageModule)
  },
  {
    path: 'ppm-vendor-status',
    loadChildren: () => import('./ppm-vendor-status/ppm-vendor-status.module').then( m => m.PpmVendorStatusPageModule)
  },
  {
    path: 'ppm-past-tickets',
    loadChildren: () => import('./ppm-past-tickets/ppm-past-tickets.module').then( m => m.PpmPastTicketsPageModule)
  },
  {
    path: 'attdence-profile',
    loadChildren: () => import('./attdence-profile/attdence-profile.module').then( m => m.AttdenceProfilePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'desboard-view-homecare',
    loadChildren: () => import('./desboard-view-homecare/desboard-view-homecare.module').then( m => m.DesboardViewHomecarePageModule)
  },
  {
    path: 'desboard-view-corporate',
    loadChildren: () => import('./desboard-view-corporate/desboard-view-corporate.module').then( m => m.DesboardViewCorporatePageModule)
  },
  {
    path: 'deshbord-view-details',
    loadChildren: () => import('./deshbord-view-details/deshbord-view-details.module').then( m => m.DeshbordViewDetailsPageModule)
  },
  {
    path: 'deshbord-view-details-coporate',
    loadChildren: () => import('./deshbord-view-details-coporate/deshbord-view-details-coporate.module').then( m => m.DeshbordViewDetailsCoporatePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'verfication-otp',
    loadChildren: () => import('./verfication-otp/verfication-otp.module').then( m => m.VerficationOtpPageModule)
  },
  {
    path: 'submit',
    loadChildren: () => import('./submit/submit.module').then( m => m.SubmitPageModule)
  },
  {
    path: 'opt-submit',
    loadChildren: () => import('./opt-submit/opt-submit.module').then( m => m.OptSubmitPageModule)
  },
  {
    path: 'charge',
    loadChildren: () => import('./charge/charge.module').then( m => m.ChargePageModule)
  },
  {
    path: 'all-convence-charge',
    loadChildren: () => import('./all-convence-charge/all-convence-charge.module').then( m => m.AllConvenceChargePageModule)
  },
  {
    path: 'city-view',
    loadChildren: () => import('./city-view/city-view.module').then( m => m.CityViewPageModule)
  },
  {
    path: 'city-submit-closer',
    loadChildren: () => import('./city-submit-closer/city-submit-closer.module').then( m => m.CitySubmitCloserPageModule)
  },
  {
    path: 'city-close-tickets',
    loadChildren: () => import('./city-close-tickets/city-close-tickets.module').then( m => m.CityCloseTicketsPageModule)
  },
  {
    path: 'account-tickets',
    loadChildren: () => import('./account-tickets/account-tickets.module').then( m => m.AccountTicketsPageModule)
  },
  {
    path: 'account-page',
    loadChildren: () => import('./account-page/account-page.module').then( m => m.AccountPagePageModule)
  },
  {
    path: 'account-view-page',
    loadChildren: () => import('./account-view-page/account-view-page.module').then( m => m.AccountViewPagePageModule)
  },
  {
    path: 'account-view-details',
    loadChildren: () => import('./account-view-details/account-view-details.module').then( m => m.AccountViewDetailsPageModule)
  },
  {
    path: 'finance-cost',
    loadChildren: () => import('./finance-cost/finance-cost.module').then( m => m.FinanceCostPageModule)
  },
  {
    path: 'leave-managment',
    loadChildren: () => import('./leave-managment/leave-managment.module').then( m => m.LeaveManagmentPageModule)
  },
  {
    path: 'leave-chart',
    loadChildren: () => import('./leave-chart/leave-chart.module').then( m => m.LeaveChartPageModule)
  },
  {
    path: 'desk',
    loadChildren: () => import('./desk/desk.module').then( m => m.DeskPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'verified-home-care',
    loadChildren: () => import('./verified-home-care/verified-home-care.module').then( m => m.VerifiedHomeCarePageModule)
  },
  {
    path: 'home-verfied-opt',
    loadChildren: () => import('./home-verfied-opt/home-verfied-opt.module').then( m => m.HomeVerfiedOptPageModule)
  },
  {
    path: 'corporate-all-tickets',
    loadChildren: () => import('./corporate-all-tickets/corporate-all-tickets.module').then( m => m.CorporateAllTicketsPageModule)
  },
  {
    path: 'services-report',
    loadChildren: () => import('./services-report/services-report.module').then( m => m.ServicesReportPageModule)
  },
  {
    path: 'services-details',
    loadChildren: () => import('./services-details/services-details.module').then( m => m.ServicesDetailsPageModule)
  },
  {
    path: 'technician',
    loadChildren: () => import('./technician/technician.module').then( m => m.TechnicianPageModule)
  },
  {
    path: 'account-branch-tickets',
    loadChildren: () => import('./account-branch-tickets/account-branch-tickets.module').then( m => m.AccountBranchTicketsPageModule)
  },
  {
    path: 'account-view',
    loadChildren: () => import('./account-view/account-view.module').then( m => m.AccountViewPageModule)
  },
  {
    path: 'account-view-details-by-id',
    loadChildren: () => import('./account-view-details-by-id/account-view-details-by-id.module').then( m => m.AccountViewDetailsByIdPageModule)
  },
  {
    path: 'complet-branch-tickets',
    loadChildren: () => import('./complet-branch-tickets/complet-branch-tickets.module').then( m => m.CompletBranchTicketsPageModule)
  },
  {
    path: 'coprate-account-details',
    loadChildren: () => import('./coprate-account-details/coprate-account-details.module').then( m => m.CoprateAccountDetailsPageModule)
  },
  {
    path: 'coprate-account-details-by-id',
    loadChildren: () => import('./coprate-account-details-by-id/coprate-account-details-by-id.module').then( m => m.CoprateAccountDetailsByIdPageModule)
  },
  {
    path: 'hvac-form',
    loadChildren: () => import('./hvac-form/hvac-form.module').then( m => m.HVACFormPageModule)
  },
  {
    path: 'ppm-view-details',
    loadChildren: () => import('./ppm-view-details/ppm-view-details.module').then( m => m.PpmViewDetailsPageModule)
  },
  {
    path: 'all-ppm-tickest',
    loadChildren: () => import('./all-ppm-tickest/all-ppm-tickest.module').then( m => m.AllPpmTickestPageModule)
  },
  {
    path: 'ppm-submit-tickets',
    loadChildren: () => import('./ppm-submit-tickets/ppm-submit-tickets.module').then( m => m.PpmSubmitTicketsPageModule)
  },
  {
    path: 'ppm-services-report',
    loadChildren: () => import('./ppm-services-report/ppm-services-report.module').then( m => m.PpmServicesReportPageModule)
  },
  {
    path: 'visitor-all-tickets',
    loadChildren: () => import('./visitor-all-tickets/visitor-all-tickets.module').then( m => m.VisitorAllTicketsPageModule)
  },
  {
    path: 'visitor-seclect-branch',
    loadChildren: () => import('./visitor-seclect-branch/visitor-seclect-branch.module').then( m => m.VisitorSeclectBranchPageModule)
  },
  {
    path: 'visitor-booking',
    loadChildren: () => import('./visitor-booking/visitor-booking.module').then( m => m.VisitorBookingPageModule)
  },
  {
    path: 'visitor-summary',
    loadChildren: () => import('./visitor-summary/visitor-summary.module').then( m => m.VisitorSummaryPageModule)
  },
  {
    path: 'visitor-clint-details',
    loadChildren: () => import('./visitor-clint-details/visitor-clint-details.module').then( m => m.VisitorClintDetailsPageModule)
  },
  {
    path: 'ppm-account-branch',
    loadChildren: () => import('./ppm-account-branch/ppm-account-branch.module').then( m => m.PpmAccountBranchPageModule)
  },
  {
    path: 'ppm-account-view-details',
    loadChildren: () => import('./ppm-account-view-details/ppm-account-view-details.module').then( m => m.PpmAccountViewDetailsPageModule)
  },
  {
    path: 'ppm-account-booking',
    loadChildren: () => import('./ppm-account-booking/ppm-account-booking.module').then( m => m.PpmAccountBookingPageModule)
  },
  {
    path: 'ppm-hvac-form',
    loadChildren: () => import('./ppm-hvac-form/ppm-hvac-form.module').then( m => m.PpmHvacFormPageModule)
  },
  {
    path: 'tseting23',
    loadChildren: () => import('./tseting23/tseting23.module').then( m => m.Tseting23PageModule)
  },
  {
    path: 'ups',
    loadChildren: () => import('./ups/ups.module').then( m => m.UPSPageModule)
  },
  {
    path: 'cctv',
    loadChildren: () => import('./cctv/cctv.module').then( m => m.CCTVPageModule)
  },
  {
    path: 'fire',
    loadChildren: () => import('./fire/fire.module').then( m => m.FirePageModule)
  },
  {
    path: 'fire-check-list',
    loadChildren: () => import('./fire-check-list/fire-check-list.module').then( m => m.FireCheckListPageModule)
  },
  {
    path: 'attdence-history',
    loadChildren: () => import('./attdence-history/attdence-history.module').then( m => m.AttdenceHistoryPageModule)
  },
  {
    path: 'approvel-testing',
    loadChildren: () => import('./approvel-testing/approvel-testing.module').then( m => m.ApprovelTestingPageModule)
  },

  {
    path: 'panel-checklist',
    loadChildren: () => import('./panel-checklist/panel-checklist.module').then( m => m.PanelChecklistPageModule)
  },
  {
    path: 'new-havc',
    loadChildren: () => import('./new-havc/new-havc.module').then( m => m.NewHavcPageModule)
  },
  {
    path: 'panels',
    loadChildren: () => import('./panels/panels.module').then( m => m.PanelsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
