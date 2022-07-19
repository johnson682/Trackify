import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminProfileService } from '../service/admin-profile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  uid:any
  adminData:any
  imageFile:any;
  constructor(
    private adminProfileService:AdminProfileService,
    private router:Router) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid
    this.adminProfileService.adminRef.doc(this.uid).valueChanges().subscribe(data=>{
      this.adminData = data
      this.imageFile = data.imageFile
    })
  }

  onEdit(uid){
    this.router.navigate(['/admin/adminProfile/'+uid])
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
              this.adminProfileService.updateAdminData(this.uid,{imageFile:this.imageFile})
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
    this.adminProfileService.updateAdminData(this.uid,{imageFile:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'})
  }
}
