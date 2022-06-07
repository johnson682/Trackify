import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.css']
})
export class AdminEmployeeListComponent implements OnInit {
  users:any

  constructor(private userService:UserService,private router:Router) { }
  ngOnInit(): void {
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user);
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users=data
    })
  }

  onView(uid){
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
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.userService.removeEmployee(uid,email,password)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
   })
  }

}
