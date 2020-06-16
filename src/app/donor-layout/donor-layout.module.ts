import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorLayoutRoutes } from './donor-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonorRequestComponent } from './donor-request/donor-request.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { NgxSpinnerModule } from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DonorLayoutRoutes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    DonorRequestComponent,
	  BookAppointmentComponent,
	  ProfileComponent,
  ]
})

export class DonorLayoutModule {}
