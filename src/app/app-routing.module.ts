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
import { AdminGuard } from './guard/admin.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'addEmployee',component:SignupComponent},

  { path: 'user', loadChildren: () => import('./component/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./component/admin/admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
