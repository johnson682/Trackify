import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:any
  uid:any

  userFilter: any = { name: '' };
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {

    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users = data
    })
  }

  selectUser(user){
    this.router.navigate(['/user/Chat/'+user.uid])
    this.onClose()
  }

  onCancel(){
    this.router.navigate(['/user/Chat'])
    this.onClose()
  }

  onClose(){
    document.getElementById("closeModalButton").click();
  }
}
