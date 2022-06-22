import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params } from '@angular/router';
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

  users:any
  localUser:any
  selectedUser =false;
  userMessage:any;
  dataOfuser:any;
  dataofSenderMessage:any;

  arr:any
  order:any
  dataofReciverMessage:any;
  localeDate:any
  senderUid:any
  reciverUid:any;
  currentDate= new Date().toLocaleString()
  userAllMessage:any

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  msgUid:any

  onrightClick(event,Recivemsg){
    this.contextmenuX=event.clientX
    this.contextmenuY=event.clientY
    this.contextmenu=true;
    this.msgUid = Recivemsg
    console.log(this.msgUid);

    const deleteMsg = document.getElementById('deleteMsg')
    if(deleteMsg != null){
      deleteMsg.addEventListener('click',()=>{
        this.delete()
      })
    }
    setTimeout(()=>{
      this.contextmenu= false;
    },2000)
  }
  disableContextMenu(){
    this.contextmenu= false;
 }
  constructor(
    private userService:UserService,
    private message:MessageService,
    private route:ActivatedRoute) {
      this.route.params.subscribe((params:Params)=>{
        this.reciverUid = params['id']
        console.log(this.reciverUid);
        if(this.reciverUid){
          this.ngOnInit()
        }
      })
     }

     

  ngOnInit(): void {

      document.body.addEventListener('click',()=>{
        this.disableContextMenu()
      })

      const trigger=document.getElementById('input')
      if(trigger != null){
        trigger.addEventListener('keydown',(e)=>{
          if(e.code == 'Enter'){
            this.sendMessage()
          }
        })
      }

      this.route.params.subscribe((params:Params)=>{
      this.reciverUid = params['id']
      console.log(this.reciverUid);
      
    })
    this.senderUid= JSON.parse(localStorage.getItem('currentUser'))

    this.init()
  }

  init(){
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users = data
      this.order ='sendingDate'
    })
    this.message.getAllSenderMessage(this.senderUid,this.reciverUid).subscribe(data=>{
      this.dataofSenderMessage = data
      this.dataofSenderMessage.forEach(ele=>{

        if(ele.senderUid == this.senderUid){
          ele.status = 'Sending'
        }else {
          ele.status = 'Reciving'
        }
      })
      
    })

  }
  sendMessage(){
    let nums = new Date().getDate()*Math.floor(Math.random()*100000000000000000000)

    this.message.add(this.senderUid,this.reciverUid,{
      senderUid:this.senderUid,
      status:'Sending',
      id:nums,
      sendingTime:+new Date(),
      message:this.userMessage,
      sendingDate:moment().format('MMM-DD hh:mm:ss a')
    })

    this.userMessage =""
  }

  delete(){
    const totalTime = Math.abs(+new Date() - this.msgUid.sendingTime)

    if(totalTime > 300000){
      Swal.fire({
        icon:'error',
        title:'oops...',
        text:'You  cannot delete Msg because it takes more than 5 mins'
      })
    }else{
      this.message.delete(this.senderUid,this.reciverUid,this.msgUid)
    }
    
    
  }

  deleteAll(){
    this.message.deleteAllMsg(this.senderUid,this.reciverUid)
  }
}
