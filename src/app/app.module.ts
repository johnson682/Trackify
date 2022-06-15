import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {NgxSpinnerModule} from 'ngx-spinner'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './component/user/user-routing.module';
import { AdminRoutingModule } from './component/admin/admin-routing.module';

import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component'

import { AuthService } from './component/login/service/auth.service';
import { UserService } from './service/user.service';

const firebaseConfig = {
  apiKey: "AIzaSyA1gBrtVrJOZwY9-voO4SrNGK8HJkyGans",
    authDomain: "trackify-d3824.firebaseapp.com",
    databaseURL: "https://trackify-d3824-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trackify-d3824",
    storageBucket: "trackify-d3824.appspot.com",
    messagingSenderId: "1013604880702",
    appId: "1:1013604880702:web:fb154e3f054b27b0c19c6f",
    measurementId: "G-WRQXN2MXDN"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    AdminRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
