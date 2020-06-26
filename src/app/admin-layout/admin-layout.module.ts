import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UserBanComponent } from './user-ban/user-ban.component';
import { UserActionBanComponent } from './user-action-ban/user-action-ban.component';
import { SalonsComponent } from './salons/salons.component';
import { AgmCoreModule } from '@agm/core';
import { ManageSalonsComponent, uploadDialogComponent } from './manage-salons/manage-salons.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';

import { NgxSpinnerModule } from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ProfileComponent } from './profile/profile.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ViewContactUsComponent } from './view-contact-us/view-contact-us.component';
import { DriversComponent } from './drivers/drivers.component';
import { ManageDriversComponent, uploadDialog1Component } from './manage-drivers/manage-drivers.component';



import { AddManagerComponent } from './add-manager/add-manager.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { ManageNotificationComponent } from './manage-notification/manage-notification.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { CdkDetailRowDirective } from './manage-notification/cdk-detail-row.directive';
import { ManageDonorComponent,uploadDialog3Component } from './manage-donor/manage-donor.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component'; 
import { MatSelectModule } from '@angular/material/select';
import { ManageAttendantsComponent,uploadDialog2Component } from './manage-attendants/manage-attendants.component';
import { MatCardModule } from '@angular/material/card'; 




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatCardModule
  ],
  declarations: [
    DashboardComponent,
    TestComponent,
    UserBanComponent,
    UserActionBanComponent,
    SalonsComponent,
    ManageSalonsComponent,
    ManageAttendantsComponent,
    uploadDialogComponent,
    uploadDialog1Component,
    uploadDialog2Component,
    uploadDialog3Component,
    AddManagerComponent,
    ViewManagerComponent,
    ProfileComponent,
    ManageContactUsComponent,
    ViewContactUsComponent,
    DriversComponent,
    ManageDriversComponent,
    ProfileComponent,
    ManageNotificationComponent,
    PushNotificationComponent,
    CdkDetailRowDirective,
    ManageDonorComponent,
    ManagePatientComponent,
  ],

})

export class AdminLayoutModule {}
