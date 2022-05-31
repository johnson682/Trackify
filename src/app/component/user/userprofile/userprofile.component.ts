import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/login/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
users:any
  constructor(
    public userService: UserService ,
    private router:Router, 
    private spinnerService:NgxSpinnerService
    ) {}
  ngOnInit(): void {
    
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user);
    
    this.userService.users.subscribe(data=>{
      data.forEach(ele=>{
        if(user.uid === ele.uid){
          this.users = ele
        }
      })
    })
  }
  onEdit(uid:any){
    this.router.navigate(['user/userprofile/'+uid])
    
  }
}
