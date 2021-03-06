import { AttendantLoginService } from './service/attendant-login.service';
import { SalonLoginService } from './service/salon-login.service';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AttendantLayoutComponent } from './attendant-layout/attendant-layout.component';
import { SalonLayoutComponent } from './salon-layout/salon-layout.component';
import { DonorLayoutComponent } from './donor-layout/donor-layout.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { HospitalLayoutComponent } from './hospital-layout/hospital-layout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

// use for test chat
import {SharedChatComponent} from './shared-layout/shared-chat/shared-chat.component';
import { AfterLoginService } from '@services/after-login.service';
import { Signup2Component } from './signup2/signup2.component';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { DonorWaitComponent } from './donor-wait/donor-wait.component';
import { PatientWaitComponent } from './patient-wait/patient-wait.component';
import { DonoractiveComponent } from './donoractive/donoractive.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BeforLoginService } from '@services/befor-login.service';
import { DonorLoginService } from '@services/donor-login.service';
import { AdminLoginService } from '@services/admin-login.service';
import { PatientLoginService } from '@services/patient-login.service';
import { ManagerLoginService } from '@services/manager-login.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dash',
    component: DashboardComponent
  },
  {
    canActivate: [BeforLoginService],
    path: 'signup-donor',
    component: SignupComponent
  },
  {
    canActivate: [BeforLoginService],
    path: 'signup-patient',
    component: Signup2Component
  },
  {
    canActivate: [BeforLoginService],
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'donor-wait',
    component: DonorWaitComponent
  },
  {
    path: 'patient-wait',
    component: PatientWaitComponent
  },
  {
    path: 'donor-active',
    component: DonoractiveComponent
  },
  {
    path: 'froget-password',
    component: PasswordRequestComponent
  },
  {
    canActivate: [BeforLoginService],
    path: 'register-password',
    component: RegisterPasswordComponent
  },
  {
    canActivate: [BeforLoginService],
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    canActivate: [AfterLoginService,AdminLoginService],
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    canActivate: [AfterLoginService,AttendantLoginService],
    path: 'attendant',
    component: AttendantLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./attendant-layout/attendant-layout.module').then(m => m.AttendantLayoutModule)
    }]
  },
  {
    canActivate: [AfterLoginService,SalonLoginService],
    path: 'salon',
    component: SalonLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./salon-layout/salon-layout.module').then(m => m.SalonLayoutModule)
    }]
  },

  {
    canActivate: [AfterLoginService,DonorLoginService],
    path: 'donor',
    component: DonorLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./donor-layout/donor-layout.module').then(m => m.DonorLayoutModule)
    }]
  },
  {
    canActivate: [AfterLoginService,PatientLoginService],
    path: 'patient',
    component: PatientLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./patient-layout/patient-layout.module').then(m => m.PatientLayoutModule)
    }]
  },
  {
    canActivate: [AfterLoginService,ManagerLoginService],
    path: 'hospital',
    component: HospitalLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./hospital-layout/hospital-layout.module').then(m => m.HospitalLayoutModule)
    }]
  },

  // use for test chat
  {
    path: 'chat',
    component: SharedChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
