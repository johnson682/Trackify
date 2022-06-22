import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  uid:any
  user:any

  imageFile:any
  users:any
  constructor(
    private userService:UserService ,
    public authService:AuthService,
    private notificationService:NotificationService,
    private router:Router) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.userService.getData(this.uid).subscribe(data=>{
      this.user = data
    })
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users = data
    })
  } 
  

  logout(){
    this.userService.userRef.doc(this.uid).get().subscribe(data=>{
      const datas = data.data()
      if(datas.StopStatus){
        this.notificationService.sweetalert2Modal(
          'Are you sure want to Logout?',
          'You will not be able to recover this LoginTime!',
          'warning',
          true,
          'Yes, Logout !',
          'No, keep Login'
        ).then((result) => {
          if (result.value) {
            this.authService.logout(this.uid)
            
          } 
       })
      }else{
        this.authService.logout(this.uid)
      }
    })
  }

  select(user){
    localStorage.setItem('currentUser',JSON.stringify(this.uid))
    this.router.navigate(['user/Chat/'+user.uid])
  }
}
