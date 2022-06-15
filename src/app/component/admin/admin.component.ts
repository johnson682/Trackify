import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../login/service/auth.service';
import { AdminProfileService } from './service/admin-profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  uid:any
  constructor(public authService:AuthService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
  } 
  
  logout(){
    this.authService.logout(this.uid)
  }

}
