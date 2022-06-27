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
  userData:any;
  uid:any
  dataofSenderMessage:any;
  reciverUid:any

  data:any
  count:any
  allData:any
  order:any
  userId:any

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  msgUid:any;

  userFilter: any = { name: '' };
  constructor(private router:Router,private userService:UserService,private message:MessageService,private route:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.order ='sendingDate'
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.init()

    document.body.addEventListener('click',()=>{
      this.disableContextMenu()
    })
  }

  init(){

    this.message.getAllChatUser(this.uid).subscribe(data=>{
      this.users = data

     
    })

    this.userService.getData(this.uid).subscribe(data=>{
      this.userData = data
    })
  
  }
  
  disableContextMenu(){
    this.contextmenu= false;
  }

  deleteAll(){
    this.message.deleteAllMsg(this.uid,this.reciverUid)
  }

  onrightClick(event,Recivemsg){
    

    this.contextmenuX=event.clientX
    this.contextmenuY=event.clientY
    this.contextmenu=true;
    this.reciverUid = Recivemsg.uid

    const deleteMsg = document.getElementById('deleteMsg')
    if(deleteMsg != null){
      deleteMsg.addEventListener('click',()=>{
        this.deleteAll()
      })
    }
    setTimeout(()=>{
      this.contextmenu= false;
    },2000)

    

  }

  openList(){
    
  }

  
}
