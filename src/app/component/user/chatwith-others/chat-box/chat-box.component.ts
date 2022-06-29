import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { FileUpload } from 'src/app/model/fileUpload';
import { FileUploadService } from 'src/app/service/fileupload.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  
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
  chatForm:FormGroup
  
  constructor(
    private message:MessageService,
    private userService:UserService,
    private route:ActivatedRoute,
    private fileiploadService:FileUploadService,
    private fileUploadService:FileUploadService,
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
    window.scrollTo(0, document.body.scrollHeight);
    this.order ='sendingDate'

    this.chatForm = new FormGroup({
      "chat":new FormControl('',Validators.required)
    })

    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.route.params.subscribe((params:Params)=>{
      this.reciverUid = params['id']
    })
    this.senderUid= this.uid

    document.body.addEventListener('click',()=>{
      this.disableContextMenu()
    })

   this.fetchDataUserList()

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
      this.order ='sendingDate'
      window.scrollTo(0, document.body.scrollHeight);
      this.dataofSenderMessage.forEach(ele=>{
        if(ele.senderUid == this.senderUid){
          ele.status = 'Sending'
        }else {
          ele.status = 'Reciving'
        }
      })
      
    })
  }
  percentage: number;
  currentFile:FileUpload
  async fileUpload(){
    const { value: file } = await Swal.fire({
      title: 'Select File',
      input: 'file',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      inputAttributes: {
        'aria-label': 'Upload your file'
      }
    })
    
    if (file) {
      this.userMessage = file.name
      this.currentFile = new FileUpload(file)
      this.fileiploadService.pushFileStorage(this.currentFile,this.senderUid,this.reciverUid).subscribe(data=>{
        this.percentage = Math.round(data)
      }),error=>{
        console.log(error);
      }

      this.saveSenderDetail()
      this.saveReciverDetails()
    }
  }

  sendMessage(){
    this.userMessage= this.chatForm.value.chat
    window.scrollTo(0, document.body.scrollHeight);
    this.saveSenderDetail()
    this.saveReciverDetails()
    this.saveMessageDetails()
    this.cancel()
  }

  lastData:any

  saveSenderDetail(){
    this.userService.getData(this.senderUid).subscribe(data=>{
      this.currentUser = data
      this.message.getLastData(this.senderUid,this.reciverUid).subscribe(data=>{
        this.lastData = data[0]
        this.message.addSenderDetail(this.senderUid,this.reciverUid,{
          name:this.currentUser.name,
          email:this.currentUser.email,
          imageFile:this.currentUser.imageFile,
          uid:this.currentUser.uid,
          newMessage:this.lastData.message,
          newMessageTime:this.lastData.sendingDate
        })

      })
    })
  }

  saveReciverDetails(){
    this.userService.getData(this.reciverUid).subscribe(data=>{
      this.selectedUser = data
      this.message.getLastData(this.senderUid,this.reciverUid).subscribe(data=>{
        this.lastData = data[0]
        this.message.addReciverDetails(this.senderUid,this.reciverUid,{
          name:this.selectedUser.name,
          email:this.selectedUser.email,
          imageFile:this.selectedUser.imageFile,
          uid:this.selectedUser.uid,
          newMessage:this.lastData.message,
          newMessageTime:this.lastData.sendingDate
        })
      })
    })
  }

  saveMessageDetails(){
    let nums = new Date().getDate()*Math.floor(Math.random()*100000000000000000000)
    this.message.add(this.senderUid,this.reciverUid,{
      message:this.userMessage,
      senderUid:this.senderUid,
      status:'Sending',
      urlStatus:false,
      id:nums,
      sendingTime:+new Date(),
      sendingSingleDate:new Date().getDate(),
      sendingDate:moment().format('MMM-DD | hh:mm:ss a')
    })
  }

  async cancel(){
    await this.chatForm.reset()
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

      if(this.msgUid.urlStatus){
        this.fileUploadService.deleteFile(this.msgUid.message,this.senderUid,this.reciverUid)
      }
    }
  } 

}
