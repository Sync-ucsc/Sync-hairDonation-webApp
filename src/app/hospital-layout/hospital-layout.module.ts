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
import { DriverLocationComponent } from './driver-location/driver-location.component';
import { AgmCoreModule } from '@agm/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild(HospitalLayoutRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    FormsModule,
    MatPasswordStrengthModule.forRoot(),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    DriverLocationComponent,
  ]
})

export class HospitalLayoutModule {}
