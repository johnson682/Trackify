import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminProfileService } from '../../service/admin-profile.service';

@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.css']
})
export class AdminProfileEditComponent implements OnInit {

  adminEditForm:FormGroup
  uid:any
  constructor(
    private route:ActivatedRoute,
    private AdminProfileService:AdminProfileService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.uid = params['id']
    })

    this.AdminProfileService.getAdminData().valueChanges().subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.uid){

          this.adminEditForm = new FormGroup({
            "displayName":new FormControl(ele.name,Validators.required),
            "photoURL":new FormControl(ele.profileURL,Validators.required)
          })
        }
      })
    })
  }

  onSubmit(){
    let name=this.adminEditForm.value.displayName
    let photoURL =this.adminEditForm.value.photoURL

    this.AdminProfileService.updateAdminData(this.uid,{name:name,profileURL:photoURL})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/admin/adminProfile'])
  }

}
