import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chatwith-others',
  templateUrl: './chatwith-others.component.html',
  styleUrls: ['./chatwith-others.component.css']
})
export class ChatwithOthersComponent implements OnInit {

  users:any
  localUser:any
  selectedUser =false;
  userMessage:any;
  dataOfuser:any;
  dataofMessage:any;

  arr:any
  order:any
  dataofReciveMessage:any;
  localeDate:any
  uid:any
  id:any
  userAllMessage:any
  constructor(
    private userService:UserService,
    private message:MessageService,
    private route:ActivatedRoute,
    private afauth:AngularFireAuth) {
      this.route.params.subscribe((params:Params)=>{
        this.id = params['id']
        console.log(this.id);
        if(this.id){
          this.ngOnInit()
        }
      })
     }

  ngOnInit(): void {
    console.log('hit');
    
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      console.log(this.id);
      
    })
    this.uid= JSON.parse(localStorage.getItem('currentUser'))

    this.init()
  }

  init(){
    this.userService.userRef.valueChanges().subscribe(data=>{
      this.users = data
      this.order ='sendingDate'
    })
    if(this.id){

      this.message.getAllMessage(this.uid,this.id).subscribe(data=>{
        this.dataofMessage = data
        console.log(data);
        this.fetchData()
      })
      this.message.getAllMessage(this.id,this.uid).subscribe(data=>{
        this.dataofReciveMessage = data 
        console.log(data);
        
        this.fetchData()
      })
    }
  }


  fetchData(){
   const data=this.dataofMessage.concat(this.dataofReciveMessage)
    this.userAllMessage = data
    console.log(data);
    
    this.userAllMessage.forEach(element => {
      console.log(element);

      if(element.uid === this.uid){
        element.status = 'Sending'
      }else{
        element.status = 'Reciving'
      }
    });
    
  }
  sendMessage(){
    this.message.add(this.uid,this.id,{
      uid:this.id,
      status:'Sending',
      message:this.userMessage,
      sendingDate:new Date().toLocaleString()
    })
    this.userMessage =""
  }

}
