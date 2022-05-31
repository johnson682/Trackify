import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEditForm:FormGroup
  id:any
  isEdit=false

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
    })
    this.userService.users.subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.id){
          
          
          this.userEditForm = new FormGroup({
            'firstname':new FormControl(ele.firstname != null ?ele.firstname : ''),
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
    console.log(this.userEditForm.value);
    let firstname = this.userEditForm.value.firstname
    let lastname = this.userEditForm.value.lastname
    let dob = this.userEditForm.value.dob
    let photoURL = this.userEditForm.value.photoURL
    let state = this.userEditForm.value.state
    let mobile = this.userEditForm.value.mobile
    this.userService.updateUserData(this.id,{firstname:firstname,lastname:lastname,profileURL:photoURL,dob:dob,state:state,mobile:mobile})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['user/userprofile'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }

}
