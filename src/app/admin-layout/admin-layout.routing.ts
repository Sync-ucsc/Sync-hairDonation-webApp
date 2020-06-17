import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { UserBanComponent } from './user-ban/user-ban.component';
import { UserActionBanComponent } from './user-action-ban/user-action-ban.component';
import { SalonsComponent } from './salons/salons.component';
import { ManageSalonsComponent } from './manage-salons/manage-salons.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';

import { DriversComponent } from './drivers/drivers.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ViewContactUsComponent } from './view-contact-us/view-contact-us.component';
import { ManageNotificationComponent } from './manage-notification/manage-notification.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';

import { ManageDonorComponent } from './manage-donor/manage-donor.component'; 
import { ManagePatientComponent } from './manage-patient/manage-patient.component'; 


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
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'test', component: TestComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user-ban', component: UserBanComponent },
    { path: 'user-action-ban', component: UserActionBanComponent },
    { path: 'salons', component: SalonsComponent },
    { path: 'manage-salons', component: ManageSalonsComponent },
    { path: 'add-manager', component: AddManagerComponent },
    { path: 'view-manager', component: ViewManagerComponent },
    { path: 'manage-contact-us', component: ManageContactUsComponent },
    { path: 'view-contact-us', component: ViewContactUsComponent },
    { path: 'drivers', component: DriversComponent },
    { path: 'manage-drivers', component: ManageDriversComponent },
    { path: 'manage-notification', component: ManageNotificationComponent },
    { path: 'push-notification', component: PushNotificationComponent },
    { path: 'manage-donor', component: ManageDonorComponent },
    { path: 'manage-patient', component: ManagePatientComponent },

];
