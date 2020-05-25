import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AttendantLayoutComponent } from './attendant-layout/attendant-layout.component';
import { DonorLayoutComponent } from './donor-layout/donor-layout.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { SalonLayoutComponent } from './salon-layout/salon-layout.component';
import { HospitalLayoutComponent } from './hospital-layout/hospital-layout.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AttendantLayoutComponent,
    PatientLayoutComponent,
    SalonLayoutComponent,
    DonorLayoutComponent,
    HospitalLayoutComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
