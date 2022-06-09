import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
users:any
uid:any
imageFile:any
  constructor(
    public userService: UserService ,
    private router:Router
    ) {}
  ngOnInit(): void {
    
    const user=JSON.parse(localStorage.getItem('user'))
    this.uid = user.uid
    this.userService.userRef.doc(user.uid).valueChanges().subscribe(data=>{
      this.users = data
      this.imageFile = data.image
      const reader = new FileReader()
      reader.readAsDataURL(this.imageFile)
    })
  }
  onEdit(uid){
    this.router.navigate(['user/userprofile/'+uid])
  }
  removeAccount(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.userService.removeAccount(this.uid)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
   })
  }
}
