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
import {SharedLayoutModule} from "../shared-layout/shared-layout.module";

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SalonLayoutRoutes),
    FormsModule,
    FullCalendarModule,
    SharedLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  declarations: [
    DashboardComponent,
    BookAppointmentComponent,
    AppointmentDetailsComponent,
    ProfileComponent,
    SaloonChatComponent,
     ViewCalendarComponent,
  ]
})

export class SalonLayoutModule {}
