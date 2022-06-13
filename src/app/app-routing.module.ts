import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEmployeeListComponent } from './component/admin/admin-employee-list/admin-employee-list.component';
import { EmployeeDetailsComponent } from './component/admin/admin-employee-list/employee-details/employee-details.component';
import { EmployeeLoginActivityComponent } from './component/admin/admin-employee-list/employee-details/employee-login-activity/employee-login-activity.component';
import { EmployeeTasksheetComponent } from './component/admin/admin-employee-list/employee-details/employee-tasksheet/employee-tasksheet.component';
import { AdminProfileEditComponent } from './component/admin/admin-profile/admin-profile-edit/admin-profile-edit.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { AdminComponent } from './component/admin/admin.component';

import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AddComponent } from './component/user/tasksheet/add/add.component';
import { EditComponent } from './component/user/tasksheet/edit/edit.component';
import { TasksheetComponent } from './component/user/tasksheet/tasksheet.component';
import { AddtimetrackerComponent } from './component/user/timetracker/addtimetracker/addtimetracker.component';
import { TimetrackerTableComponent } from './component/user/timetracker/timetracker-table/timetracker-table.component';
import { TimetrackerComponent } from './component/user/timetracker/timetracker.component';
import { UserloginActivityComponent } from './component/user/timetracker/userlogin-activity/userlogin-activity.component';
import { UserComponent } from './component/user/user.component';
import { UserEditComponent } from './component/user/userprofile/user-edit/user-edit.component';
import { UserprofileComponent } from './component/user/userprofile/userprofile.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'addEmployee',component:SignupComponent},
  

  {path:'admin',component:AdminComponent,canActivate:[AdminGuard],data: {uid: 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'},children:[
    {path:'',redirectTo:'adminEmployeeList',pathMatch:'full'},
    {path:'adminEmployeeList',component:AdminEmployeeListComponent},
    {path:'adminEmployeeList/:uid',component:EmployeeDetailsComponent,children:[
      {path:'',redirectTo:'EmployeeLoginActivity',pathMatch:'full'},
      {path:'EmployeeLoginActivity',component:EmployeeLoginActivityComponent},
      {path:'EmployeeTasksheet',component:EmployeeTasksheetComponent}
    ]},
    {path:'adminProfile',component:AdminProfileComponent},
    {path:':id',component:AdminProfileEditComponent},
  ]},
  
  {path:'user',component:UserComponent,canActivate: [AuthGuard] ,children:[
    {path:'',redirectTo:'timetracker',pathMatch:'full'},
    {path:'userprofile',component:UserprofileComponent,children:[
      {path:':id',component:UserEditComponent}
    ]},
    {path:'tasksheet',component:TasksheetComponent},
    {path:'tasksheet/addTotasksheet',component:AddComponent},
    {path:'tasksheet/:id',component:EditComponent},
    {path:'timetracker',component:TimetrackerComponent,children:[
      {path:'',redirectTo:'loginActivity',pathMatch:'full'},
      {path:'loginActivity',component:UserloginActivityComponent},
      {path:'timeTrackerTable',component:TimetrackerTableComponent},
      {path:'timeTrackerTable/addTimeTracker',component:AddtimetrackerComponent},
    ]},
    {path:'dashboard',component:DashboardComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
