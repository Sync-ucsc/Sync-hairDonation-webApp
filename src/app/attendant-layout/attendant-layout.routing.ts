import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {ManagePatientComponent} from './manage-patient/manage-patient.component';
import {AttendantChatComponent} from './attendant-chat/attendant-chat.component';
import {AfterLoginService} from '@services/after-login.service';
import {ManageWigrequestComponent} from './manage-wigrequest/manage-wigrequest.component';
import {PatientVerificationComponent} from './patient-verification/patient-verification.component';
import {ManageSalonRequestComponent} from './manage-salon-request/manage-salon-request.component';
import { WigrequsetVerifyComponent } from './wigrequset-verify/wigrequset-verify.component';
import { ManualRequestComponent } from './manual-request/manual-request.component';



export const AttendantLayoutRoutes: Routes = [
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
  // , canActivate: [AfterLoginService],}, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // , canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // , canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // , canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // , canActivate: [AfterLoginService],}, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'manage-patient',
    component: ManagePatientComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'chat',
    component: AttendantChatComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'manage-wigrequest',
    component: ManageWigrequestComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'verify-wigrequest',
    component: WigrequsetVerifyComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'patient-verification',
    component: PatientVerificationComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'manage-salon-request',
    component: ManageSalonRequestComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'manual-request',
    component: ManualRequestComponent,
     canActivate: [AfterLoginService],
  },

];
