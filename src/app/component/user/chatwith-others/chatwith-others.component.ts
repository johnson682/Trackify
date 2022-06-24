import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chatwith-others',
  templateUrl: './chatwith-others.component.html',
  styleUrls: ['./chatwith-others.component.scss']
})
export class ChatwithOthersComponent implements OnInit {

  
  users:any;
  user:any;
  uid:any
  dataofSenderMessage:any;

  constructor(private router:Router,private userService:UserService,private message:MessageService,) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.init()
  }

  init(){
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users = data
    })

    this.userService.getData(this.uid).subscribe(data=>{
      this.user = data
    })
  
  }
  

  

  deleteAll(){
    // this.message.deleteAllMsg(this.users.uid,this.reciverUid)
  }

  select(user){
    this.router.navigate(['user/Chat/'+user.uid])
  }

  
}
