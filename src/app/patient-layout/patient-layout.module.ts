import { BlockUIModule } from 'ng-block-ui';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Layout
import { PatientLayoutRoutes } from './patient-layout.routing';
import {SharedLayoutModule} from '../shared-layout/shared-layout.module';
// Material
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
// Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { WigRequestComponent} from './wig-request/wig-request.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientChatComponent } from './patient-chat/patient-chat.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
    imports: [
        CommonModule,
        BlockUIModule.forRoot(),
        RouterModule.forChild(PatientLayoutRoutes),
        FormsModule,
        SharedLayoutModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCardModule,
        MatPasswordStrengthModule.forRoot(),
        MatInputModule,
        NgApexchartsModule
    ],
  declarations: [
    DashboardComponent,
	  WigRequestComponent,
	  ProfileComponent,
	  PatientChatComponent,
  ]
})

export class PatientLayoutModule {}
