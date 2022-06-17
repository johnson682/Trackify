import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-employee-profile-details-edit',
  templateUrl: './employee-profile-details-edit.component.html',
  styleUrls: ['./employee-profile-details-edit.component.scss']
})
export class EmployeeProfileDetailsEditComponent implements OnInit {
  uid:any
  EmployeeEditForm:FormGroup
  isOpen=false
  constructor(private router:Router,private userService:UserService,private formBuilder:FormBuilder,private notificationService:NotificationService) { }

  ngOnInit(): void {
    const data=JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = data

    this.EmployeeEditForm = this.formBuilder.group({
      DateofJoin:[''],
      role:['']
    })

    this.userService.getData(this.uid).subscribe(data=>{
      this.init(data)
    })
  }

  init(data){
    this.EmployeeEditForm.patchValue({
      DateofJoin:data.DateofJoin,
      role:data.role
    })
  }

  onSubmit(){
    let DateofJoin = moment(this.EmployeeEditForm.value.DateofJoin).format('DD-MM-YYYY') 
    let role = this.EmployeeEditForm.value.role

    this.userService.updateUserData(this.uid,{DateofJoin:DateofJoin,role:role})
    this.notificationService.sweetalert2('success','SuccessFully Updated!!!')
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/admin/adminEmployeeList/'+this.uid+'/EmployeeProfileDetails'])
    document.getElementById("closeModalButton").click();
  }
}
