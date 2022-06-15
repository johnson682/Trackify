import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
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
      this.imageFile = data.imageFile
    })
  }
  onEdit(uid){
    this.router.navigate(['/user/userprofile/'+uid])
  }
  removeAccount(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      iconColor:'red',
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

  async addprofile(){
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e)=>{
        Swal.fire({
          title: 'Your uploaded picture',
          imageAlt: 'The uploaded picture'
        })
        this.imageFile = e.target.result
        this.userService.updateUserData(this.uid,{imageFile:this.imageFile})
      }
      reader.readAsDataURL(file)
    }
  }

  removeImg(){
    this.userService.updateUserData(this.uid,{imageFile:null})
  }
}
