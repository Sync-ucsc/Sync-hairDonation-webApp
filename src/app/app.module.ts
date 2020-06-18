import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AttendantLayoutComponent} from './attendant-layout/attendant-layout.component';
import {DonorLayoutComponent} from './donor-layout/donor-layout.component';
import {PatientLayoutComponent} from './patient-layout/patient-layout.component';
import {SalonLayoutComponent} from './salon-layout/salon-layout.component';
import {HospitalLayoutComponent} from './hospital-layout/hospital-layout.component';
import {OwlModule} from 'ngx-owl-carousel';
import {FullCalendarModule} from '@fullcalendar/angular';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

//google maps
import {AgmCoreModule} from '@agm/core';

//http client
import {HttpClientModule} from '@angular/common/http';

//salon api service

import { SalonApiService } from './service/salon-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './shared-layout/chat/chat.component';

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
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    SalonApiService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
