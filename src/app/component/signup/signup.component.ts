import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  addEmployeeForm:FormGroup
  constructor(
    public authService:AuthService,
    private router:Router,
    private notificationService:NotificationService,
    private spinnerService:NgxSpinnerService){}
  ngOnInit(): void {
    this.spinnerService.hide()
      this.addEmployeeForm = new FormGroup({
        'email':new FormControl('',Validators.required),
        'password':new FormControl('',Validators.required)
      })
  }
  onSubmit(){

    let email = this.addEmployeeForm.value.email
    let password = this.addEmployeeForm.value.password

    this.authService.SignUp(email,password).catch(error=>{
      console.log(error);
      
    })
    this.notificationService.showSuccess("Employee Added Successfully","Well Done")
    this.onCancel()
    // Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  onCancel(){
    this.router.navigate(['admin/adminEmployeeList'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }
}
