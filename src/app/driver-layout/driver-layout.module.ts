import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverLayoutRoutes } from './driver-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(DriverLayoutRouts),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DriverLayoutModule { }
