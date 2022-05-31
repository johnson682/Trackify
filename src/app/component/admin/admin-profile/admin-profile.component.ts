import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProfileService } from '../service/admin-profile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  uid:any
  adminData:any
  constructor(
    private adminProfileService:AdminProfileService,
    private router:Router) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid
    this.adminProfileService.getAdminData().valueChanges().subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.uid){
          this.adminData=ele
        }
      })
    })
  }

  onEdit(uid){
    this.router.navigate(['admin/'+uid])
  }
}
