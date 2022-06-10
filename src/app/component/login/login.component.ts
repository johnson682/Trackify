import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/component/login/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup 
  uid:any
  constructor(public authService:AuthService){}
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
  }
}
