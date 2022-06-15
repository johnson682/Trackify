import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SignupComponent } from '../signup/signup.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { EmployeeDetailsComponent } from './admin-employee-list/employee-details/employee-details.component';
import { EmployeeLoginActivityComponent } from './admin-employee-list/employee-details/employee-login-activity/employee-login-activity.component';
import { EmployeeTasksheetComponent } from './admin-employee-list/employee-details/employee-tasksheet/employee-tasksheet.component';
import { AdminProfileEditComponent } from './admin-profile/admin-profile-edit/admin-profile-edit.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFilterModule } from 'ngx-filter';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    AdminComponent,
    AdminProfileComponent,
    AdminEmployeeListComponent,
    AdminProfileEditComponent,
    EmployeeDetailsComponent,
    SignupComponent,
    EmployeeLoginActivityComponent,
    EmployeeTasksheetComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFilterModule,
    FilterPipeModule,
    NgSelectModule ,
    AdminRoutingModule

  ]
})
export class AdminModule { }
