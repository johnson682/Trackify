import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs';
import { EncryptDecryptService } from 'src/app/service/encrypt&Decrypt.service';
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
  userData:any;
  uid:any;
  reciverUid:any
  order:any

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  userFilter: any = { name: '' };

  constructor(
    private router:Router,
    private userService:UserService,
    private message:MessageService,
    private encryptedDecryptedService:EncryptDecryptService) {
  }
  
  ngOnInit(): void {
    
    this.order ='sendingDate'
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.init()
  }

  init(){
    this.message.getAllChatUser(this.uid).subscribe(data=>{
      this.users = data
      this.users.forEach(ele=>{
        const decrypt = this.encryptedDecryptedService.get('messages',ele.newMessage)
        const message=decrypt.replace(/['"]+/g, '')

        ele.newMessage = message
      })
    })
    this.userService.getData(this.uid).subscribe(data=>{
      this.userData = data
    })

    
  
  }

  select(reciverUid){
    this.message.updateMsg(this.uid,reciverUid,{notification:true})
  }

}
