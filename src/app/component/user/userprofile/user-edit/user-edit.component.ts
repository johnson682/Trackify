
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  userEditForm:FormGroup
  uid:any
  imageFile:any
  data:any
  isOpen = false;
  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.uid = params['id']
    })
    this.userService.getData(this.uid).subscribe(data=>{
      this.userEditForm = new FormGroup({
        "name":new FormControl(data.name,Validators.required),
        "dob":new FormControl(data.dob,Validators.required),
        "state":new FormControl(data.state,Validators.required),
        "mobile":new FormControl(data.mobile,Validators.required)
      })
    })
  }

  onSubmit(){
    let name = this.userEditForm.value.name
    let dob = moment(this.userEditForm.value.dob).format('DD-MM-YYYY')   
    let state = this.userEditForm.value.state
    let mobile = this.userEditForm.value.mobile
    this.userService.updateUserData(this.uid,{name:name,dob:dob,state:state,mobile:mobile})
    
    this.notificationService.sweetalert2('success','Updated Successfully')
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/user/userprofile'])
    document.getElementById("closeModalButton").click();
  }

}
