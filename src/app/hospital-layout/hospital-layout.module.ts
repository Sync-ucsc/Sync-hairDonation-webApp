import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalLayoutRoutes } from './hospital-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HospitalLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
  ]
})

export class HospitalLayoutModule {}
