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
            'firstname':new FormControl(ele.firstname != null ?ele.firstname : '',Validators.required),
            'lastname':new FormControl(ele.lastname!= null ?ele.lastname : ''),
            'photoURL':new FormControl(ele.profileURL!= null ?ele.profileURL : ''),
            'dob':new FormControl(ele.dob!= null ?ele.dob : ''),
            'state':new FormControl(ele.state!= null ?ele.state : ''),
            'mobile':new FormControl(ele.mobile!= null ?ele.mobile : '')
          })
        }
      })
    })
  }

  onSubmit(){
    let name=this.adminEditForm.value.displayName
    let firstname = this.adminEditForm.value.firstname
    let lastname = this.adminEditForm.value.lastname
    let dob = this.adminEditForm.value.dob
    let photoURL = this.adminEditForm.value.photoURL
    let state = this.adminEditForm.value.state
    let mobile = this.adminEditForm.value.mobile
    this.AdminProfileService.updateAdminData(this.uid,{firstname:firstname,lastname:lastname,profileURL:photoURL,dob:dob,state:state,mobile:mobile})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/admin/adminProfile'])
    document.getElementById("closeModalButton").click();
  }

}
