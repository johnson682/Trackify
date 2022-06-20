import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  addEmployeeForm:UntypedFormGroup
  constructor(
    public authService:AuthService,
    private router:Router,
    private notificationService:NotificationService){}
  ngOnInit(): void {
      this.addEmployeeForm = new UntypedFormGroup({
        'userName':new UntypedFormControl('',Validators.required),
        'email':new UntypedFormControl('',Validators.required),
        'password':new UntypedFormControl('',Validators.required)
      })
  }
  onSubmit(){

    let email = this.addEmployeeForm.value.email
    let password = this.addEmployeeForm.value.password
    let userName = this.addEmployeeForm.value.userName
    this.authService.SignUp(email,password,userName)
    this.notificationService.sweetalert2("success","Employee Added Successfully")
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['admin/adminEmployeeList'])
    document.getElementById("closeModalButton").click();
  }
}
