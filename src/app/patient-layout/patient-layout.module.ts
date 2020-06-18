import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLayoutRoutes } from './patient-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WigRequestComponent} from './wig-request/wig-request.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientChatComponent } from './patient-chat/patient-chat.component';
import {SharedLayoutModule} from "../shared-layout/shared-layout.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientLayoutRoutes),
    FormsModule,
    SharedLayoutModule,
  ],
  declarations: [
    DashboardComponent,
	  WigRequestComponent,
	  ProfileComponent,
	  PatientChatComponent,
  ]
})

export class PatientLayoutModule {}
