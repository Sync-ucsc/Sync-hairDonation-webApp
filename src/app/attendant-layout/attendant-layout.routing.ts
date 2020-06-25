import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { AttendantChatComponent } from './attendant-chat/attendant-chat.component';
import { AfterLoginService } from '@services/after-login.service';

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
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterLoginService],},
    { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],},
    { path: 'manage-patient', component: ManagePatientComponent, canActivate: [AfterLoginService],},
    { path: 'chat', component: AttendantChatComponent, canActivate: [AfterLoginService],},
];
