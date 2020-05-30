import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UserBanComponent } from './user-ban/user-ban.component';
import { UserActionBanComponent } from './user-action-ban/user-action-ban.component';
import { SalonsComponent } from './salons/salons.component';
import { AgmCoreModule } from '@agm/core';
import { ManageSalonsComponent } from './manage-salons/manage-salons.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'; 



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkGlhRjMfmotb0UBMf8EAcmkTB6v3WEVM',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule

  ],
  declarations: [
    DashboardComponent,
    TestComponent,
    UserBanComponent,
    UserActionBanComponent,
    SalonsComponent,
    ManageSalonsComponent,
  ],
  
})

export class AdminLayoutModule {}
