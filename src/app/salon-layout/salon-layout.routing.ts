import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { ProfileComponent } from './profile/profile.component';
import {ViewCalendarComponent} from './view-calendar/view-calendar.component';
import { SaloonChatComponent } from './saloon-chat/saloon-chat.component';
import { SalonLocationComponent } from './salon-location/salon-location.component';
import { AfterLoginService } from '@services/after-login.service';


export const SalonLayoutRoutes: Routes = [
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
    { path: 'book_appointment',      component: BookAppointmentComponent, canActivate: [AfterLoginService],},
    { path: 'appointment_details',      component: AppointmentDetailsComponent, canActivate: [AfterLoginService],},
    { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],},
    {path: 'view_calendar',component:ViewCalendarComponent},
    { path: 'chat', component: SaloonChatComponent, canActivate: [AfterLoginService],},
    { path: 'wigCollect', component: SalonLocationComponent, canActivate: [AfterLoginService],},
];
