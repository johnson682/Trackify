import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  addEmployeeForm:FormGroup
  constructor(
    public authService:AuthService,
    private router:Router,
    private notificationService:NotificationService){}
  ngOnInit(): void {
      this.addEmployeeForm = new FormGroup({
        'email':new FormControl('',Validators.required),
        'password':new FormControl('',Validators.required)
      })
  }
  onSubmit(){

    let email = this.addEmployeeForm.value.email
    let password = this.addEmployeeForm.value.password
    this.authService.SignUp(email,password)
    this.notificationService.sweetalert2("success","Employee Added Successfully")
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['admin/adminEmployeeList'])
    document.getElementById("closeModalButton").click();
  }
}
