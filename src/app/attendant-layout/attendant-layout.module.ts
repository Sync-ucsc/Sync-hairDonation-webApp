import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendantLayoutRoutes } from './attendant-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttendantLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ManagePatientComponent,
  ]
})

export class AttendantLayoutModule {}
