import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login'])
    document.getElementById("closeModalButton").click();
  }
}
