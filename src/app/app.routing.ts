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
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: 'attendant',
    component: AttendantLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./attendant-layout/attendant-layout.module').then(m => m.AttendantLayoutModule)
    }]
  },
  {
    path: 'salon',
    component: SalonLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./salon-layout/salon-layout.module').then(m => m.SalonLayoutModule)
    }]
  },
  
  {
    path: 'donor',
    component: DonorLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./donor-layout/donor-layout.module').then(m => m.DonorLayoutModule)
    }]
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./patient-layout/patient-layout.module').then(m => m.PatientLayoutModule)
    }]
  },
  {
    path: 'hospital',
    component: HospitalLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./hospital-layout/hospital-layout.module').then(m => m.HospitalLayoutModule)
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
