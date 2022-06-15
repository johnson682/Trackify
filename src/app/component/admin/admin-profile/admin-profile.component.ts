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
    this.router.navigate(['admin/'+uid])
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
        if(e.total <= 700000){
          this.imageFile = e.target.result
          this.adminProfileService.updateAdminData(this.uid,{imageFile:this.imageFile})
        }else{
          Swal.fire({
            icon:'error',
            title:'oops...',
            text:'Image Size must less than 700kb'
          }).then(
            this.addprofile
          )
        }
      }
      reader.readAsDataURL(file)
    }
  }

  removeImg(){
    this.adminProfileService.updateAdminData(this.uid,{imageFile:null})
  }
}
