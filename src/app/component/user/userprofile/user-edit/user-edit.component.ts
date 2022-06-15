
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
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

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    this.route.params.subscribe((params:Params)=>{
      this.uid = params['id']
    })
    this.userEditForm = new FormGroup({
      "name":new FormControl('',Validators.required),
      'dob':new FormControl('',Validators.required),
      'state':new FormControl('',Validators.required),
      'mobile':new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    let name = this.userEditForm.value.name
    let dob = this.userEditForm.value.dob   
    let state = this.userEditForm.value.state
    let mobile = this.userEditForm.value.mobile
    this.userService.updateUserData(this.uid,{name:name,dob:dob,state:state,mobile:mobile})
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['/user/userprofile'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }

}
