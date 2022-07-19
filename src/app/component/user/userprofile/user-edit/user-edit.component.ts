
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userEditForm:UntypedFormGroup
  uid:any
  imageFile:any
  data:any
  isOpen = false;
  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    private formBuilder:UntypedFormBuilder,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.uid = params['id']
    })

    this.userEditForm = this.formBuilder.group({
      name:['',Validators.required],
      dob:['',Validators.required],
      Address:['',Validators.required],
      mobile:['',Validators.required]
    })
    this.userService.getData(this.uid).subscribe(data=>{
      this.init(data)
    })
  }
  init(data){
    this.userEditForm.patchValue({
      name:data.name,
      dob:data.dob,
      Address:data.Address,
      mobile:data.mobile
    })
  }

  onSubmit(){
    let name = this.userEditForm.value.name
    let dob = moment(this.userEditForm.value.dob).format('DD-MM-YYYY')   
    let Address = this.userEditForm.value.Address
    let mobile = this.userEditForm.value.mobile
    this.userService.updateUserData(this.uid,{name:name,dob:dob,Address:Address,mobile:mobile})
    this.notificationService.sweetalert2('success','Updated Successfully')
    this.onCancel()
  }
  onCancel(){
    document.getElementById('exampleModal').classList.add('animate__animated','animate__fadeOut')
    this.router.navigate(['/user/user-main/userprofile'])
    document.getElementById("closeModalButton").click();

  }

}
