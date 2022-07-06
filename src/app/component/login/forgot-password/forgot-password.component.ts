import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordResetEmail:string;
  constructor(
    public authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  forgot(){
    this.authService.forgotPassword(this.passwordResetEmail).then(()=>{
      this.router.navigate(['/login'])
      document.getElementById("closeModalButton").click();
    })
  }

  login(){
    this.router.navigate(['/login'])
    document.getElementById("closeModalButton").click();
  }
}
