import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

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


// google maps
import {AgmCoreModule} from '@agm/core';

// http client
import {HttpClientModule} from '@angular/common/http';

// salon api service

import { SalonApiService } from './service/salon-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AttendantApiService } from '@services/attendant-api.service';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';
import { BeforLoginService } from '@services/befor-login.service';
import { AfterLoginService } from '@services/after-login.service';
import { DonorApiService } from './service/donor-api.service';
import { Signup2Component } from './signup2/signup2.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DonorWaitComponent } from './donor-wait/donor-wait.component';
import { PatientWaitComponent } from './patient-wait/patient-wait.component';
import { DonoractiveComponent } from './donoractive/donoractive.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { BlockUIModule } from 'ng-block-ui';

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
    Signup2Component,
    PasswordRequestComponent,
    ChangePasswordComponent,
    DonorWaitComponent,
    PatientWaitComponent,
    DonoractiveComponent,
    RegisterPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    BlockUIModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places','geometry']
    }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatPasswordStrengthModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    UserService,
    TokenService,
    AuthService,
    BeforLoginService,
    AfterLoginService,
    SalonApiService,
    DonorApiService,
    AttendantApiService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
