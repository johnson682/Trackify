import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEditForm:FormGroup
  id:any
  photoURL:any;
  displayName:any;
  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
    })
    this.userService.users.subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.id){

          this.photoURL=ele.profileURL;
          this.displayName = ele.name;
          
          this.userEditForm = new FormGroup({
            'displayName':new FormControl(this.displayName,Validators.required),
            'photoURL':new FormControl(this.photoURL,Validators.required)
          })
        }
      })
    })
    
  }

  onSubmit(){
    this.displayName = this.userEditForm.value.displayName
    this.photoURL = this.userEditForm.value.photoURL
    this.userService.updateUserData(this.id,{name:this.displayName,profileURL:this.photoURL})
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['/user/userprofile'])
  }

}
