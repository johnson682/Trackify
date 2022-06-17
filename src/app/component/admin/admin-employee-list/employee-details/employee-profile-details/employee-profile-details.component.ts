import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-employee-profile-details',
  templateUrl: './employee-profile-details.component.html',
  styleUrls: ['./employee-profile-details.component.scss']
})
export class EmployeeProfileDetailsComponent implements OnInit {
  user:any
  uid:any
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const data=JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = data
    this.userService.getData(this.uid).subscribe(data=>{
      this.user = data
      console.log(this.user);
      
    })
  }


}
