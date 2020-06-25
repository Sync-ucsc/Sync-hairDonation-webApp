import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WigRequestComponent } from './wig-request/wig-request.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientChatComponent} from './patient-chat/patient-chat.component';
import { AfterLoginService } from '@services/after-login.service';

export const PatientLayoutRoutes: Routes = [
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
    { path: 'wig_request',      component: WigRequestComponent, canActivate: [AfterLoginService],},
    { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],},
    { path: 'chat', component: PatientChatComponent, canActivate: [AfterLoginService],},
];
