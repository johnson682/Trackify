import { Component, OnInit } from '@angular/core';
import { AnyMxRecord } from 'dns';
import * as moment from 'moment';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
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
  constructor(private userService:UserService ,public authService:AuthService,private tasksheetService:TasksheetService) { }

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
        Swal.fire({
          title: 'Are you sure want to Logout?',
          text: 'You will not be able to recover this LoginTime!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Logout !',
          cancelButtonText: 'No, keep Login'
        }).then((result) => {
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
