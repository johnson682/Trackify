import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss']
})
export class AdminEmployeeListComponent implements OnInit {
  users:any
  userLoginTime:any
  constructor(private userService:UserService,private router:Router) { }
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
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userService.removeEmployee(uid)
      }
   })
  }

}
