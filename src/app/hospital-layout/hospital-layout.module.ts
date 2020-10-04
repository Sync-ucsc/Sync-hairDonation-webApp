import { BlockUIModule } from 'ng-block-ui';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalLayoutRoutes } from './hospital-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild(HospitalLayoutRoutes),
    FormsModule,
    MatPasswordStrengthModule.forRoot(),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
  ]
})

export class HospitalLayoutModule {}
