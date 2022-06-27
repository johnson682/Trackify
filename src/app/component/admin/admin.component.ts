import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../login/service/auth.service';
import { AdminProfileService } from './service/admin-profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  uid:any
  user:any
  constructor(public authService:AuthService,private adminProfileService:AdminProfileService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.adminProfileService.getAdminData(this.uid).subscribe(data=>{
      this.user = data
    })
  } 
  
  logout(){
    this.adminProfileService.adminRef.doc(this.uid).update({ Status: false ,logoutTime:moment().format('MMM DD')});
    this.authService.logout(this.uid)
  }

}
