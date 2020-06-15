import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLayoutRoutes } from './patient-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WigRequestComponent} from './wig-request/wig-request.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
	  WigRequestComponent,
	  ProfileComponent,
  ]
})

export class PatientLayoutModule {}
