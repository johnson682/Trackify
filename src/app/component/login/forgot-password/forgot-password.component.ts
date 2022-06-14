import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private spinnerService:NgxSpinnerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.spinnerService.hide()
  }

  login(){
    this.router.navigate(['/login'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }
}
