import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
// component
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {ManagePatientComponent} from './manage-patient/manage-patient.component';
import {AttendantChatComponent} from './attendant-chat/attendant-chat.component';
import {ManageWigRequestComponent} from './manage-wig-request/manage-wig-request.component';
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
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ManagePatientComponent,
    AttendantChatComponent,
    ManageWigRequestComponent,
  ]
})

export class AttendantLayoutModule {
}
