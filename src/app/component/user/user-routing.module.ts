import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ChatwithOthersComponent } from './chatwith-others/chatwith-others.component';
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

  {path:'',component:UserComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'timetracker',pathMatch:'full'},
    {path:'userprofile',component:UserprofileComponent,children:[
      {path:':id',component:UserEditComponent}
    ]},
    {path:'tasksheet',component:TasksheetComponent,children:[
      {path:'addTotasksheet',component:AddComponent},
      {path:':year/:month/:id',component:EditComponent},
    ]},
    {path:'timetracker',component:TimetrackerComponent,children:[
      {path:'',redirectTo:'loginActivity',pathMatch:'full'},
      {path:'loginActivity',component:UserloginActivityComponent},
      {path:'timeTrackerTable',component:TimetrackerTableComponent,children:[
        {path:'addTimeTracker',component:AddtimetrackerComponent},
      ]},
    ]},
    {path:'Chat/:id',component:ChatwithOthersComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'**',component:PageNotFoundComponent,pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
