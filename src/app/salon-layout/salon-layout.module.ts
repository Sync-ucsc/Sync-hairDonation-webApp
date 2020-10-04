import { BlockUIModule } from 'ng-block-ui';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalonLayoutRoutes } from './salon-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileComponent } from './profile/profile.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { SaloonChatComponent } from './saloon-chat/saloon-chat.component';
import {SharedLayoutModule} from '../shared-layout/shared-layout.module';


import { SalonLocationComponent } from './salon-location/salon-location.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild(SalonLayoutRoutes),
    FormsModule,
    FullCalendarModule,
    SharedLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
  ],
  declarations: [
    DashboardComponent,
    BookAppointmentComponent,
    AppointmentDetailsComponent,
    ProfileComponent,
    SaloonChatComponent,
    ViewCalendarComponent,
    SalonLocationComponent,
  ]
})

export class SalonLayoutModule {}
