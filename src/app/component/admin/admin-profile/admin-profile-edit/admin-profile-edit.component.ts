import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { AdminProfileService } from '../../service/admin-profile.service';
@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.scss']
})
export class AdminProfileEditComponent implements OnInit {

  adminEditForm:UntypedFormGroup
  uid:any
  isOpen = false
  constructor(
    private route:ActivatedRoute,
    private AdminProfileService:AdminProfileService,
    private formBuilder:UntypedFormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    console.log('hit');
    
    this.route.params.subscribe((params:Params)=>{
      this.uid = params['id']
    })

    this.adminEditForm = this.formBuilder.group({
      name:[''],
      dob:[''],
      Address:[''],
      mobile:['']
    })
    this.AdminProfileService.getAdminData(this.uid).subscribe(data=>{
      this.init(data)
    })

  }

  init(data){
    this.adminEditForm.patchValue({
      name:data.name,
      dob:data.dob,
      Address:data.Address,
      mobile:data.mobile
    })
  }

  onSubmit(){
    let name = this.adminEditForm.value.name
    let dob = moment(this.adminEditForm.value.dob).format('DD-MM-YYYY')
    let Address = this.adminEditForm.value.Address
    let mobile = this.adminEditForm.value.mobile
    this.AdminProfileService.updateAdminData(this.uid,{name:name,dob:dob,Address:Address,mobile:mobile})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/admin/adminProfile'])
    document.getElementById("closeModalButton").click();
  }

}
