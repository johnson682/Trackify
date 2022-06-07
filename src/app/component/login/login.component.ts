import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/component/login/service/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";  
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup 
  uid:any
  constructor(
    public authService:AuthService,
    private timtrackerService:TimeTrackerService,
    private userloginActivity:UserloginActivityService){}
  ngOnInit(): void {
      this.loginForm = new FormGroup({
        'email':new FormControl('',Validators.required),
        'password':new FormControl('',Validators.required)
      })
  }
  onSubmit(){
    let email = this.loginForm.value.email
    let password = this.loginForm.value.password

    this.authService.login(email,password)
    // this.userloginActivity.add(this.uid,{started:this.timtrackerService.getCurrentTimeInTaskStartEndFormat()})
  }
}
