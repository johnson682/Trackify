import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SignupComponent } from '../signup/signup.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { EmployeeDetailsComponent } from './admin-employee-list/employee-details/employee-details.component';
import { EmployeeLoginActivityComponent } from './admin-employee-list/employee-details/employee-login-activity/employee-login-activity.component';
import { EmployeeProfileDetailsEditComponent } from './admin-employee-list/employee-details/employee-profile-details/employee-profile-details-edit/employee-profile-details-edit.component';
import { EmployeeProfileDetailsComponent } from './admin-employee-list/employee-details/employee-profile-details/employee-profile-details.component';
import { EmployeeTasksheetComponent } from './admin-employee-list/employee-details/employee-tasksheet/employee-tasksheet.component';
import { AdminProfileEditComponent } from './admin-profile/admin-profile-edit/admin-profile-edit.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {path:'',component:AdminComponent,canActivate:[AdminGuard],data: {uid: '5ChkFNzhwHQ3mV8YaUmZgH6IPlz1'},children:[
    {path:'',redirectTo:'adminEmployeeList',pathMatch:'full'},
    {path:'adminEmployeeList',component:AdminEmployeeListComponent,children:[
      {path:'addEmployee',component:SignupComponent},
    ]},
    {path:'adminEmployeeList/:uid',component:EmployeeDetailsComponent,children:[
      {path:'',redirectTo:'EmployeeProfileDetails',pathMatch:'full'},
      {path:'EmployeeLoginActivity',component:EmployeeLoginActivityComponent},
      {path:'EmployeeTasksheet',component:EmployeeTasksheetComponent},
      {path:'EmployeeProfileDetails',component:EmployeeProfileDetailsComponent,children:[
        {path:'EmployeeProfileDetailsEdit',component:EmployeeProfileDetailsEditComponent}
      ]},
    ]},
    {path:'adminProfile',component:AdminProfileComponent,children:[
      {path:':id',component:AdminProfileEditComponent},
    ]},
    {path:'**',component:PageNotFoundComponent,pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
