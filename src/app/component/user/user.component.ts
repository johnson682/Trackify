import { Component, OnInit } from '@angular/core';
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
  constructor(
    private userService:UserService ,
    public authService:AuthService,
    private notificationService:NotificationService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.userService.getData(this.uid).subscribe(data=>{
      this.user = data
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

}
