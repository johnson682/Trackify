import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner'
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { UserprofileComponent } from './component/user/userprofile/userprofile.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component'
import { UserlistComponent } from './component/user/userlist/userlist.component';
import { UserComponent } from './component/user/user.component';
import { UserEditComponent } from './component/user/userprofile/user-edit/user-edit.component';
import { TasksheetComponent } from './component/user/tasksheet/tasksheet.component';
import { AddComponent } from './component/user/tasksheet/add/add.component';
import { EditComponent } from './component/user/tasksheet/edit/edit.component';

import { AuthService } from './component/login/service/auth.service';
import { UserService } from './service/user.service';
import { AdminComponent } from './component/admin/admin.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { AdminSidenavComponent } from './component/admin/admin-sidenav/admin-sidenav.component';
import { AdminEmployeeListComponent } from './component/admin/admin-employee-list/admin-employee-list.component';
import { AdminProfileEditComponent } from './component/admin/admin-profile/admin-profile-edit/admin-profile-edit.component';
import { EmployeeDetailsComponent } from './component/admin/admin-employee-list/employee-details/employee-details.component';
import { SignupComponent } from './component/signup/signup.component';
import { GravatarModule } from 'ngx-gravatar';
import { TimetrackerComponent } from './component/user/timetracker/timetracker.component';

const firebaseConfig = {
  apiKey: "AIzaSyA1gBrtVrJOZwY9-voO4SrNGK8HJkyGans",
  authDomain: "trackify-d3824.firebaseapp.com",
  databaseURL:"https://trackify-d3824-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackify-d3824",
  storageBucket: "trackify-d3824.appspot.com",
  messagingSenderId: "1013604880702",
  appId: "1:1013604880702:web:fb154e3f054b27b0c19c6f",
  measurementId: "G-WRQXN2MXDN"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    LoginComponent,
    ForgotPasswordComponent,
    AdminComponent,
    UserprofileComponent,
    UserlistComponent,
    UserComponent,
    UserEditComponent,
    TasksheetComponent,
    AddComponent,
    EditComponent,
    AdminProfileComponent,
    AdminSidenavComponent,
    AdminEmployeeListComponent,
    AdminProfileEditComponent,
    EmployeeDetailsComponent,
    SignupComponent,
    TimetrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilterPipeModule,
    NgSelectModule,
    NgxPaginationModule,
    GravatarModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
