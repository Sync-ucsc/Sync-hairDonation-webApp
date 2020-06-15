import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorLayoutRoutes } from './donor-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonorRequestComponent } from './donor-request/donor-request.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DonorLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    DonorRequestComponent,
	BookAppointmentComponent,
	ProfileComponent,
  ]
})

export class DonorLayoutModule {}
