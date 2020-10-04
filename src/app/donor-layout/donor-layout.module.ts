import { BlockUIModule } from 'ng-block-ui';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorLayoutRoutes } from './donor-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonorRequestComponent } from './donor-request/donor-request.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';


import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { NgxSpinnerModule } from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProfileComponent } from './profile/profile.component';
import { DonorChatComponent } from './donor-chat/donor-chat.component';
import {SharedLayoutModule} from "../shared-layout/shared-layout.module";

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {ManageAppointmentComponent} from './manage-appointment/manage-appointment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgApexchartsModule } from "ng-apexcharts";
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@NgModule({
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild(DonorLayoutRoutes),
    FormsModule,
	  FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    SharedLayoutModule,
    NgApexchartsModule,
    MatPasswordStrengthModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    DonorRequestComponent,
	  AppointmentDetailsComponent,
	  BookAppointmentComponent,
	  ProfileComponent,
    DonorChatComponent,
    ManageAppointmentComponent,

  ]
})

export class DonorLayoutModule {}
