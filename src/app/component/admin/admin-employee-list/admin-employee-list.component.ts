import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.css']
})
export class AdminEmployeeListComponent implements OnInit {

  users:any
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.users.subscribe(data=>{
      this.users=data
      console.log(this.users);
      
    })
  }

  onView(uid){
    this.router.navigate(['/admin/adminEmployeeList/'+uid])
  }

}
