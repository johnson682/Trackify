import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
users:any
uid:any
  constructor(
    public userService: UserService ,
    private router:Router
    ) {}
  ngOnInit(): void {
    
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user);
    this.uid = user.uid
    this.userService.userRef.doc(user.uid).valueChanges().subscribe(data=>{
      console.log(data.uid);
      this.users = data
    })
  }
  onEdit(uid){
    console.log(uid);
    
    this.router.navigate(['user/userprofile/'+uid])
    
  }
}
