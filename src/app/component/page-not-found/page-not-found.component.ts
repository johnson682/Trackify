import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  uid:any
  userData:any
  constructor(private authService:AuthService,private router:Router,private location:Location) { }

  ngOnInit(): void {
    // this.uid = this.next.data['uid']
    // console.log(this.uid);
    
    this.userData = JSON.parse(localStorage.getItem('user'))
  }

  back(){
    this.location.back()
    // if(this.authService.isLoggedIn === true && 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'!== this.userData.uid){
    //   this.router.navigate(['/user'])
    // }else if(this.authService.isLoggedIn === true && 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'=== this.userData.uid){
    //   this.router.navigate(['/admin'])
    // }else{
    //   this.router.navigate(['/login'])
    // }

  }
}
