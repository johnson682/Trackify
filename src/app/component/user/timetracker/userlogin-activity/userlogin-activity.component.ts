import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-userlogin-activity',
  templateUrl: './userlogin-activity.component.html',
  styleUrls: ['./userlogin-activity.component.scss']
})

export class UserloginActivityComponent implements OnInit {
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  stopButton=false;
  date=[]
  years=[]
  uid:any;
  stopTime:any;
  localTimeStart:any;
  localTimeEnd:any;
  dateTotal:any;
  month:any;
  task:any;
  year:any
  datasFromLogin:any
  file:any
  time:any;

  constructor(
    private tasksheetService:TasksheetService,
    private userService:UserService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    const userData= JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    
    
    this.month= moment().format('MMM');
    this.year = new Date().getFullYear()
    this.task={date:new Date().getDate(),month:this.month,year:this.year}

    const monthNum = moment().format('M')
    this.dateTotal = this.getDaysInMonth(monthNum,this.year)
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=this.dateTotal;i++){
      this.date.push(i)
    }

    this.fetchData()
  }

  fetchData(){
    let date = new Date().getDate()
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data

      this.file=this.datasFromLogin.filter(obj => obj.date === date && obj.month === this.month && obj.year === this.year )   

      if(this.file.length >0){
        this.userService.updateUserData(this.uid,{StopStatus:false})
      }else{
        this.userService.updateUserData(this.uid,{StopStatus:true})
      }

      var finalData = this.file.map((obj)=>{
        return obj.totalTime
      })
      
      if(finalData.length === 0){
        this.time = "00:00:00"
      }else{
        var time =finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      }
    })

    this.userService.userRef.doc(this.uid).get().subscribe(data=>{
      const datas = data.data()
      if(datas.StopStatus){
        this.stopButton = true
      }
      this.localTimeStart = datas.localTimeStart
    })
  }
  getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  };

  stopTimer(){
    this.notificationService.sweetalert2Modal(
      'Are you sure want to Stop?',
      'You will not be able to restart activity!',
      'warning',
      true,
      'Yes, Stop it!',
      'No, keep it'
    ).then((result) => {
      if (result.value) {
        this.userService.updateUserData(this.uid,{StopStatus:false})
        this.userService.userRef.doc(this.uid).get().subscribe(data=>{
          const datas= data.data()

          if(!datas.StopStatus){
            this.stopButton = false
          }
          this.localTimeEnd = moment().format('hh:mm a')
          this.stopTime = new Date().getTime()
          const  totalTime = this.stopTime - datas.startTime
          const time = this.tasksheetService.convertMsToHM(totalTime) 
          
          this.tasksheetService.add(this.uid,{
            startTimeInMS:datas.startTime,
            stopTimeInMs:this.stopTime,
            startTime:datas.localTimeStart,
            endTime:this.localTimeEnd,
            month:moment().format('MMM'),
            year:new Date().getFullYear(),
            date:new Date().getDate(),
            totalHours:time,
            totalTime:totalTime,
            localDate:moment().format('DD-MM-YYYY')
    
          },'ActivityLog')
  
        }) 
        this.notificationService.sweetalert2('warning','Timer Stopped!') 
      }
    })   
  }

  delete(time){
    this.notificationService.sweetalert2Modal(
      'Are you sure want to Delete?',
      'You will not be able to Recovery!',
      'warning',
      true,
      'Yes, Delete it!',
      'No, keep it'
    ).then((result) => {
      if (result.value) {
        this.tasksheetService.deleteTask(this.uid,time.uid,time,'ActivityLog')
        this.notificationService.sweetalert2('error','Login Activity removed!!')
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    }) 

  }

  changeDay(event){
    
    if(event != undefined){
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
    }else{
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin=data
        this.file = this.datasFromLogin
        
        var finalData =this.file.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      })
    }
  }

  changeMonth(event){
    if(event != undefined){
      this.month= event
      let temp =[];
      const monthNum = moment().month(event).format('M')
      this.dateTotal = this.getDaysInMonth(monthNum,this.year)
      for(let i=1;i<=this.dateTotal;i++){
        temp.push(i)
      }
      this.date = [...temp]
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
    }
  }

  changeYear(event){
    if(event != undefined){
      this.year = event
      let temp =[];
      const monthNum = moment().month(this.month).format('M')
      this.dateTotal = this.getDaysInMonth(monthNum,this.year)
      for(let i=1;i<=this.dateTotal;i++){
        temp.push(i)
      }
      this.date = [...temp]
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
    }
  }

  add(total,num){
    return total + num
  }

  dataFronChangeEvent(event,uid,month,year){
    this.tasksheetService.getAllTask(uid,{month:month,year:year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === event || obj.month === event  || obj.year == event)
      var finalData = this.file.map((obj)=>{
        return obj.totalTime
      })
      
      if(finalData.length === 0){
        this.time = "00:00:00"
      }else{
        var time =finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      }
    })
  }
  
}
