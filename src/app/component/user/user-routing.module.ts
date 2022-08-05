import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ChatBoxComponent } from './chatwith-others/chat-box/chat-box.component';
import { ChatwithOthersComponent } from './chatwith-others/chatwith-others.component';
import { UserListComponent } from './chatwith-others/user-list/user-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './tasksheet/add/add.component';
import { EditComponent } from './tasksheet/edit/edit.component';
import { TasksheetComponent } from './tasksheet/tasksheet.component';
import { AddtimetrackerComponent } from './timetracker/addtimetracker/addtimetracker.component';
import { TimetrackerTableComponent } from './timetracker/timetracker-table/timetracker-table.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { UserloginActivityComponent } from './timetracker/userlogin-activity/userlogin-activity.component';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { UserComponent } from './user.component';
import { UserEditComponent } from './userprofile/user-edit/user-edit.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [

  {path:'',component:UserComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'user-main',pathMatch:'full'},
    {path:'user-main',component:UserSidenavComponent,children:[
      {path:'',redirectTo:'tasksheet',pathMatch:'full'},
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
      {path:'dashboard',component:DashboardComponent},
      {path:'contact',component:ContactUsComponent},
    ]},
    {path:'Chat',component:ChatwithOthersComponent,children:[
      {path:'userlist',component:UserListComponent},
      {path:':id',component:ChatBoxComponent},
    ]},
    
    {path:'**',component:PageNotFoundComponent,pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
