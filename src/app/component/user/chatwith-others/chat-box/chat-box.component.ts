import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  dataofSenderMessage:any;
  senderUid:any
  reciverUid:any;
  userMessage:any;

  order:any;
  selectedUser:any;
  currentUser:any;

  uid:any
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  msgUid:any

  constructor(
    private message:MessageService,
    private userService:UserService,
    private route:ActivatedRoute,
  ){ 
    this.route.params.subscribe((params:Params)=>{
      this.reciverUid = params['id']
      console.log(this.reciverUid);
      if(this.reciverUid){
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.order ='sendingDate'
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid


    this.route.params.subscribe((params:Params)=>{
      this.reciverUid = params['id']
    })

    this.senderUid= this.uid

    this.fetchDataUserList()
    this.scrollToBottom()

    document.body.addEventListener('click',()=>{
      this.disableContextMenu()
    })

   

    this.userService.getData(this.reciverUid).subscribe(data=>{
      this.selectedUser = data
    })
    this.userService.getData(this.senderUid).subscribe(data=>{
      this.currentUser = data
    })

    const trigger=document.getElementById('input')
    if(trigger != null){
      trigger.addEventListener('keydown',(e)=>{
        if(e.code == 'Enter'){
          this.sendMessage()
        }
      })
    }
  }

  fetchDataUserList(){
    this.message.getAllSenderMessage(this.senderUid,this.reciverUid).subscribe(data=>{
      this.dataofSenderMessage = data
      this.dataofSenderMessage.forEach(ele=>{

        console.log(new Date().getDate())
        if(ele.sendingSingleDate == new Date().getDate()){
          ele.dateStatus = 'today'
        }else if(new Date().getDate() - ele.sendingSingleDate == 1){
          ele.dateStatus = 'yesterday'
        }else{
          ele.dateStatus = 'fewDays'
        }

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
      message:this.userMessage,
      senderUid:this.senderUid,
      status:'Sending',
      id:nums,
      sendingTime:+new Date(),
      sendingSingleDate:new Date().getDate(),
      dateStatus:'today',
      sendingDate:moment().format('MMM-DD hh:mm:ss a')
    })

    this.scrollToBottom()
    this.userMessage =""
  }

  

  disableContextMenu(){
    this.contextmenu= false;
  }

  onrightClick(event,Recivemsg){
    this.contextmenuX=event.clientX
    this.contextmenuY=event.clientY
    this.contextmenu=true;
    this.msgUid = Recivemsg

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

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}
