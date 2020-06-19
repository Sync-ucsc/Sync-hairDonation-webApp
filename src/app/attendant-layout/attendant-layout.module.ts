import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendantLayoutRoutes } from './attendant-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { AttendantChatComponent } from './attendant-chat/attendant-chat.component';
import {SharedLayoutModule} from "../shared-layout/shared-layout.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttendantLayoutRoutes),
    FormsModule,
    SharedLayoutModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ManagePatientComponent,
    AttendantChatComponent,
  ]
})

export class AttendantLayoutModule {}
