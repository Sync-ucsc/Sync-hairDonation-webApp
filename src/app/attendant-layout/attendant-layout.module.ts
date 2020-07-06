import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// layout
import {SharedLayoutModule} from '../shared-layout/shared-layout.module';
// routing
import {AttendantLayoutRoutes} from './attendant-layout.routing';
// material module
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
// component
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {ManagePatientComponent} from './manage-patient/manage-patient.component';
import {AttendantChatComponent} from './attendant-chat/attendant-chat.component';
import {PatientVerificationComponent} from './patient-verification/patient-verification.component';
import {ManageWigrequestComponent} from './manage-wigrequest/manage-wigrequest.component';
import { ManageSalonRequestComponent } from './manage-salon-request/manage-salon-request.component';
import { AssignDriverComponent } from './manage-salon-request/assign-driver/assign-driver.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AttendantLayoutRoutes),
        FormsModule,
        SharedLayoutModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatAutocompleteModule,
        NgxSpinnerModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ManagePatientComponent,
    AttendantChatComponent,
    ManageWigrequestComponent,
    PatientVerificationComponent,
    ManageSalonRequestComponent,
    AssignDriverComponent,
  ],
})
export class AttendantLayoutModule {}
