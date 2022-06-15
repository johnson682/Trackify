import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { AdminProfileService } from '../admin/service/admin-profile.service';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  uid:any
  users:any;
  user:any

  constructor(private userService:UserService ,public authService:AuthService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
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
            Swal.fire(
              'Logout!',
              'Your LoginTime has been Stoped.',
              'success'
            )
            this.authService.logout(this.uid)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your LoginTime is safe :)',
              'error'
            )
          }
       })
      }else{
        this.authService.logout(this.uid)
      }
    })
  }

}
