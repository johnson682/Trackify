import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SignupComponent } from './component/signup/signup.component';
import { ChatwithOthersComponent } from './component/user/chatwith-others/chatwith-others.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent },
  
  { path: 'user', loadChildren: () => import('./component/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./component/admin/admin.module').then(m => m.AdminModule) },
  {path:'**',component:PageNotFoundComponent,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
