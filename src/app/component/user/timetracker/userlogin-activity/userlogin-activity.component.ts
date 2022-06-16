import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlogin-activity',
  templateUrl: './userlogin-activity.component.html',
  styleUrls: ['./userlogin-activity.component.scss']
})
export class UserloginActivityComponent implements OnInit {
  uid:any
  
  fileName:any
  stopButton=false
  stopTime:any
  localTimeStart:any
  localTimeEnd:any
  dateTotal:any

  month:any;
  date=[]
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  year:any
  datas:any
  order:string 
  constructor(
    private tasksheetService:TasksheetService,
    private userService:UserService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    const userData= JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.userService.userRef.doc(this.uid).get().subscribe(data=>{
      const datas = data.data()

      if(datas.StopStatus){
        this.stopButton = true
      }
      this.localTimeStart = datas.localTimeStart
      
    })

    
    
    this.month= moment().format('MMM');
    this.year = moment().format('YYYY')
    this.task={date:moment().format('DD'),month:this.month,year:this.year}

    const monthNum = moment().format('M')
    this.dateTotal = this.getDaysInMonth(monthNum,this.year)
    
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=this.dateTotal;i++){
      this.date.push(i)
    }

    this.order= 'startTime'
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === moment().format('DD') && obj.month === this.month && obj.year === this.year )
     
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

  getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  };

  stopTimer(){
    Swal.fire({
      title: 'Are you sure want to Stop?',
      text: 'You will not be able to restart activity!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Stop it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
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
              year:moment().format('YYYY'),
              date:moment().format('DD'),
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
    Swal.fire({
      title: 'Are you sure want to Delete?',
      text: 'You will not be able to Recovery!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your Login Time will be Deleted.',
          'success'
        )
        this.tasksheetService.deleteTask(this.uid,time.uid,time,'ActivityLog')
        this.notificationService.sweetalert2('error','Login Activity removed!!')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Time will keep it safe :)',
          'error'
        )
      }
   })
    
    
  }

  datasFromLogin:any
  file:any
  time:any;
  totalHRS=0



  changeDay(event){
  
    if(event != undefined){
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.date === event)
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
    }else{
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.order ='date'
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      })
    }
  }
  changeMonth(event){
    this.month= event

    if(event != undefined){
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.month === event)
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
    }else{
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      })
    }
  }



  changeYear(event){
    this.year = event
    if(event != undefined){
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.year === event)
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
    }else{
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      })
    }
  }
  add(total,num){
    return total + num
  }

  
}
