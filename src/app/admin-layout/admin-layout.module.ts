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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    FullCalendarModule,
  ],
  declarations: [
    DashboardComponent,
    TestComponent,
    UserBanComponent,
    UserActionBanComponent,
  ]
})

export class AdminLayoutModule {}
