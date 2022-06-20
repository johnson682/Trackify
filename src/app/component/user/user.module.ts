import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { TimetrackerTableComponent } from './timetracker/timetracker-table/timetracker-table.component';
import { AddtimetrackerComponent } from './timetracker/addtimetracker/addtimetracker.component';
import { UserloginActivityComponent } from './timetracker/userlogin-activity/userlogin-activity.component';
import { TasksheetComponent } from './tasksheet/tasksheet.component';
import { UserEditComponent } from './userprofile/user-edit/user-edit.component';
import { AddComponent } from './tasksheet/add/add.component';
import { EditComponent } from './tasksheet/edit/edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    UserprofileComponent,
    UserEditComponent,
    TimetrackerComponent,
    TimetrackerTableComponent,
    AddtimetrackerComponent,
    UserloginActivityComponent,
    TasksheetComponent,
    AddComponent,
    EditComponent,
    DashboardComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,
    NgSelectModule,
    FilterPipeModule,
    OrderModule,
    BsDatepickerModule.forRoot(),
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
