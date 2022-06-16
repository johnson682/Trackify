import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminProfileService } from '../../service/admin-profile.service';
@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.scss']
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

    this.AdminProfileService.getAdminData(this.uid).subscribe(data=>{
      this.adminEditForm = new FormGroup({
        'name':new FormControl(data.name),
        'dob':new FormControl(data.dob),
        'state':new FormControl(data.state),
        'mobile':new FormControl(data.mobile)
      })
    })

  }

  onSubmit(){
    let name = this.adminEditForm.value.name
    let dob = new Date(this.adminEditForm.value.dob).toLocaleDateString()
    let state = this.adminEditForm.value.state
    let mobile = this.adminEditForm.value.mobile
    this.AdminProfileService.updateAdminData(this.uid,{name:name,dob:dob,state:state,mobile:mobile})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/admin/adminProfile'])
    document.getElementById("closeModalButton").click();
  }

}
