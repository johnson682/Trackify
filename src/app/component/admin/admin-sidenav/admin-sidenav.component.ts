import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/login/service/auth.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  constructor(public authService:AuthService) { }
  uid:any
  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid
  }
  logout(){
    this.authService.logout(this.uid)
  }

}
