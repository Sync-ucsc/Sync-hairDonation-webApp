import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { UserBanComponent } from './user-ban/user-ban.component';
import { UserActionBanComponent } from './user-action-ban/user-action-ban.component';
import { SalonsComponent } from './salons/salons.component';
import { ManageSalonsComponent } from './manage-salons/manage-salons.component';
import { ProfileComponent } from './profile/profile.component';

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
    { path: 'manage-salons', component: ManageSalonsComponent }
];
