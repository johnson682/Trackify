import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './tasksheet/add/add.component';
import { EditComponent } from './tasksheet/edit/edit.component';
import { TasksheetComponent } from './tasksheet/tasksheet.component';
import { AddtimetrackerComponent } from './timetracker/addtimetracker/addtimetracker.component';
import { TimetrackerTableComponent } from './timetracker/timetracker-table/timetracker-table.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { UserloginActivityComponent } from './timetracker/userlogin-activity/userlogin-activity.component';
import { UserComponent } from './user.component';
import { UserEditComponent } from './userprofile/user-edit/user-edit.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [
  {path:'',redirectTo:'user',pathMatch:'full'},
  {path:'user',component:UserComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'timetracker',pathMatch:'full'},
    {path:'userprofile',component:UserprofileComponent,children:[
      {path:':id',component:UserEditComponent}
    ]},
    {path:'tasksheet',component:TasksheetComponent},
    {path:'tasksheet/addTotasksheet',component:AddComponent},
    {path:'tasksheet/:year/:month/:id',component:EditComponent},
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
