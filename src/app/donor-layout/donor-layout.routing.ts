import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DonorRequestComponent } from './donor-request/donor-request.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { ProfileComponent } from './profile/profile.component';
import { DonorChatComponent } from './donor-chat/donor-chat.component';
import { ManageAppointmentComponent }  from  './manage-appointment/manage-appointment.component';
import { AfterLoginService } from '@services/after-login.service';




export const DonorLayoutRoutes: Routes = [
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
    { path: 'donate_hair',      component: DonorRequestComponent, canActivate: [AfterLoginService],},
    { path: 'book_appointment',      component: BookAppointmentComponent, canActivate: [AfterLoginService],},
	  { path: 'appointment_details',  component: AppointmentDetailsComponent, canActivate: [AfterLoginService],},
    { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],},
    { path: 'chat', component: DonorChatComponent, canActivate: [AfterLoginService],},
    { path: 'manage_appointment', component: ManageAppointmentComponent, canActivate: [AfterLoginService], },


];
