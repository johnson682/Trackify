import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEmployeeListComponent } from './component/admin/admin-employee-list/admin-employee-list.component';
import { EmployeeDetailsComponent } from './component/admin/admin-employee-list/employee-details/employee-details.component';
import { AdminProfileEditComponent } from './component/admin/admin-profile/admin-profile-edit/admin-profile-edit.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { AdminComponent } from './component/admin/admin.component';

import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { AddComponent } from './component/user/tasksheet/add/add.component';
import { EditComponent } from './component/user/tasksheet/edit/edit.component';
import { TasksheetComponent } from './component/user/tasksheet/tasksheet.component';
import { UserComponent } from './component/user/user.component';
import { UserEditComponent } from './component/user/userprofile/user-edit/user-edit.component';
import { UserprofileComponent } from './component/user/userprofile/userprofile.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  

  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'adminEmployeeList',pathMatch:'full'},
    {path:'adminEmployeeList',component:AdminEmployeeListComponent},
    {path:'adminEmployeeList/:uid',component:EmployeeDetailsComponent},
    {path:'adminProfile',component:AdminProfileComponent},
    {path:':id',component:AdminProfileEditComponent}
  ]},
  
  {path:'user',component:UserComponent,canActivate: [AuthGuard] ,children:[
    {path:'',redirectTo:'tasksheet',pathMatch:'full'},
    {path:'userprofile',component:UserprofileComponent,children:[
      {path:':id',component:UserEditComponent}
    ]},
    {path:'tasksheet',component:TasksheetComponent},
    {path:'tasksheet/addTotasksheet',component:AddComponent},
    {path:'tasksheet/:id',component:EditComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
