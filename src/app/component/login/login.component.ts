import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/component/login/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:UntypedFormGroup 
  uid:any
  loading = false
  constructor(public authService:AuthService,private router:Router){}
  ngOnInit(): void {
      this.loginForm = new UntypedFormGroup({
        'email':new UntypedFormControl('',Validators.required),
        'password':new UntypedFormControl('',Validators.required)
      })
  }
  onSubmit(){
    this.loading = true

    let email = this.loginForm.value.email
    let password = this.loginForm.value.password
    this.authService.login(email,password).then(()=>{
      this.loading = false
    })

  }
}
