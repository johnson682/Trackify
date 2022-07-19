import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/service/notification.service';
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
    private router:Router,
    private notificationService:NotificationService,
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
    this.router.navigate(['/user/user-main/userprofile/'+uid])
  }
  removeAccount(){
    this.notificationService.sweetalert2Modal(
       'Are you sure want to remove?',
       'You will not be able to recover this file!',
      'warning',
      true,
      'Yes, delete it!',
      'No, keep it',
    ).then((result) => {
      if (result.value) {
        this.userService.removeAccount(this.uid)
      }
   })
  }

  async addprofile(){
    Swal.fire({
      imageUrl:`${this.imageFile}`,
      imageAlt:'Select Image No Image Found',
      imageWidth: 220,
      imageHeight: 220,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      showCancelButton: true,
      confirmButtonText: 'Change Your profile',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor:'red'
    }).then(async result=>{
      if(result.value){
        const { value: file } =await Swal.fire({
          title: 'Select image',
          input: 'file',
          inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          }
        })
        if (file) {
          const reader = new FileReader()
          reader.onload = (e)=>{
            if(e.total <= 700000){
              this.imageFile = e.target.result
              this.userService.updateUserData(this.uid,{imageFile:this.imageFile})
            }else{
              Swal.fire({
                icon:'error',
                title:'oops...',
                text:'Image Size must less than 700kb',
                showClass: {
                  popup: 'animate__animated animate__fadeIn'
                },
                allowOutsideClick:false
              }).then(
                this.addprofile
              )
            }
          }
          reader.readAsDataURL(file)
        }
      }
    })
    
  }

  removeImg(){
    this.userService.updateUserData(this.uid,{imageFile:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'})
  }
}
