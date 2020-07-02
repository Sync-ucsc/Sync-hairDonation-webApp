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
import { ManageWigrequestComponent } from './manage-wigrequest/manage-wigrequest.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttendantLayoutRoutes),
    FormsModule,
    SharedLayoutModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatCardModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ManagePatientComponent,
    AttendantChatComponent,
    ManageWigrequestComponent,
  ]
})

export class AttendantLayoutModule {}
