import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/login/service/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(public authService:AuthService) {}

  uid:any
  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid
  }

  logout(){
    this.authService.logout(this.uid)
  }
}
