import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss']
})
export class AdminEmployeeListComponent implements OnInit {
  users:any
  userLoginTime:any
  userFilter: any = { name: '' };
  constructor(
    private userService:UserService,
    private router:Router,
    private notificationService:NotificationService) { }
  ngOnInit(): void {
    const user=JSON.parse(localStorage.getItem('user'))
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users=data
    })
  }

  onView(uid){
    localStorage.setItem('Employee Uid',JSON.stringify(uid))
    this.router.navigate(['/admin/adminEmployeeList/'+uid])
  }

  remove(uid,email,password){
    this.notificationService.sweetalert2Modal(
      'Are you sure want to remove?',
      'You will not be able to recover this file!',
      'warning',
      true,
      'Yes, delete it!',
      'No, keep it').then((result) => {
      if (result.value) {
        this.userService.removeEmployee(uid)
      }
   })
  }

}
