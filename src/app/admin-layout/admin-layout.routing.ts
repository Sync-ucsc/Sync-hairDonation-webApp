import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TestComponent} from './test/test.component';
import {UserBanComponent} from './user-ban/user-ban.component';
import {UserActionBanComponent} from './user-action-ban/user-action-ban.component';
import {SalonsComponent} from './salons/salons.component';
import {ManageSalonsComponent} from './manage-salons/manage-salons.component';
import {AddManagerComponent} from './add-manager/add-manager.component';
import {ViewManagerComponent} from './view-manager/view-manager.component';

import {DriversComponent} from './drivers/drivers.component';
import {ManageDriversComponent} from './manage-drivers/manage-drivers.component';

import {ProfileComponent} from './profile/profile.component';
import {ManageContactUsComponent} from './manage-contact-us/manage-contact-us.component';
import {ViewContactUsComponent} from './view-contact-us/view-contact-us.component';

import {PushNotificationComponent} from './push-notification/push-notification.component';
import {ManageNotificationComponent} from './manage-notification/manage-notification.component';
import {ManageDonorComponent} from './manage-donor/manage-donor.component';
import {ManagePatientComponent} from './manage-patient/manage-patient.component';
import { ManageDonorRequestComponent } from './manage-donor-request/manage-donor-request.component';

import {AttendantsComponent} from './attendants/attendants.component';
import {ManageAttendantsComponent} from './manage-attendants/manage-attendants.component';
import {AfterLoginService} from '@services/after-login.service';

import { WigrequestVerifyComponent } from './wigrequest-verify/wigrequest-verify.component';

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  //, canActivate: [AfterLoginService],}, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  //, canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  //, canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  //, canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  //, canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  {path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService],},
  {path: 'test', component: TestComponent, canActivate: [AfterLoginService],},
  {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],},
  {path: 'user-ban', component: UserBanComponent, canActivate: [AfterLoginService],},
  {path: 'user-action-ban', component: UserActionBanComponent, canActivate: [AfterLoginService],},
  {path: 'salons', component: SalonsComponent, canActivate: [AfterLoginService],},
  {path: 'manage-salons', component: ManageSalonsComponent, canActivate: [AfterLoginService],},
  {path: 'add-manager', component: AddManagerComponent, canActivate: [AfterLoginService],},
  {path: 'view-manager', component: ViewManagerComponent, canActivate: [AfterLoginService],},
  {path: 'manage-contact-us', component: ManageContactUsComponent, canActivate: [AfterLoginService],},
  {path: 'view-contact-us', component: ViewContactUsComponent, canActivate: [AfterLoginService],},
  {path: 'drivers', component: DriversComponent, canActivate: [AfterLoginService],},
  {path: 'add-drivers', component: DriversComponent, canActivate: [AfterLoginService],},
  {path: 'manage-drivers', component: ManageDriversComponent, canActivate: [AfterLoginService],},
  {path: 'manage-notification', component: ManageNotificationComponent, canActivate: [AfterLoginService],},
  {path: 'push-notification', component: PushNotificationComponent, canActivate: [AfterLoginService],},
  {path: 'manage-donor', component: ManageDonorComponent, canActivate: [AfterLoginService],},
  {path: 'manage-donor-request', component: ManageDonorRequestComponent, canActivate: [AfterLoginService],},
  {path: 'manage-patient', component: ManagePatientComponent, canActivate: [AfterLoginService],},
  {path: 'attendants', component: AttendantsComponent, canActivate: [AfterLoginService],},
  {path: 'manage-attendants', component: ManageAttendantsComponent, canActivate: [AfterLoginService],},
  {path: 'verify-wigrequest', component: WigrequestVerifyComponent, canActivate: [AfterLoginService],},

];
