import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserComponent } from './user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { ChatBoxComponent } from './chatwith-others/chat-box/chat-box.component';
import { UserListComponent } from './chatwith-others/user-list/user-list.component';
import { ChatwithOthersComponent } from './chatwith-others/chatwith-others.component';
import { DarkModeComponent } from '../dark-mode/dark-mode.component';
import { NgChartsModule } from 'ng2-charts';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http)
}
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
    UserComponent,
    ContactUsComponent,
    UserSidenavComponent,
    ChatBoxComponent,
    UserListComponent,
    ChatwithOthersComponent,
    DarkModeComponent,
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
    NgChartsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    NgChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
