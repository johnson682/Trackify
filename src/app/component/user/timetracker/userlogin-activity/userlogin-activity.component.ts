import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';
import { UserService } from 'src/app/service/user.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlogin-activity',
  templateUrl: './userlogin-activity.component.html',
  styleUrls: ['./userlogin-activity.component.scss']
})
export class UserloginActivityComponent implements OnInit {
  uid:any
  
  fileName:any
  
  startTime:any
  stopTime:any
  localTimeStart:any
  localTimeEnd:any

  tasks:any
  dateFromlocal:any
  month:any;
  date=[]
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  
  datas:any
  order:string 
  constructor(
    private loginActivityService:UserloginActivityService,
    private tasksheetService:TasksheetService,
    private userService:UserService) { }

  ngOnInit(): void {
    const userData= JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.userService.userRef.doc(this.uid).get().subscribe(data=>{
      const datas = data.data()

      this.localTimeStart = datas.localTimeStart
      console.log(this.localTimeStart);
      
    })
    
    this.month= this.tasksheetService.getMonth()

    this.task={date:new Date().getDate(),month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=31;i++){
      this.date.push(i)
    }


    


    this.loginActivityService.getData(this.uid).subscribe(data=>{
      this.datasFromLogin = data
      this.order= 'startTime'
      this.file=this.datasFromLogin.filter(obj => obj.date === new Date().getDate() && obj.month === this.tasksheetService.getMonth() && obj.year === new Date().getFullYear() )
     
      var finalData = this.file.map((obj)=>{
        return obj.totalTime
      })
      
      if(finalData.length === 0){
        this.time = "00:00:00"
      }else{
        var time =finalData.reduce(this.add)
        this.time = this.loginActivityService.convertMsToHM(time)
      }
    })

  }

  stopTimer(){
    this.userService.userRef.doc(this.uid).get().subscribe(data=>{

      const datas= data.data()

      this.localTimeEnd = new Date().toLocaleTimeString()
      this.stopTime = new Date().getTime()
      
        const  totalTime = this.stopTime - datas.startTime
        const time = this.loginActivityService.convertMsToHM(totalTime) 
        
        this.loginActivityService.add(this.uid,{
          startTimeInMS:datas.startTime,
          stopTimeInMs:this.stopTime,
          startTime:datas.localTimeStart,
          endTime:this.localTimeEnd,
          month:this.tasksheetService.getMonth(),
          year:new Date().getFullYear(),
          date:new Date().getDate(),
          totalHours:time,
          totalTime:totalTime,
          localDate:new Date().toLocaleDateString()
  
        })

      }) 
      
  }
  delete(uid){
    this.loginActivityService.delete(this.uid,uid)
  }

  datasFromLogin:any
  file:any
  time:any;
  totalHRS=0



  changeDay(event){
  
    if(event != undefined){
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.date === event)
        var finalData = this.file.map((obj)=>{
          return obj.totalTime
        })
        
        if(finalData.length === 0){
          this.time = "00:00:00"
        }else{
          var time =finalData.reduce(this.add)
          this.time = this.loginActivityService.convertMsToHM(time)
        }
      })
    }else{
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.loginActivityService.convertMsToHM(time)
      })
    }
  }
  changeMonth(event){
    if(event != undefined){
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.month === event)
        var finalData = this.file.map((obj)=>{
          return obj.totalTime
        })
        if(finalData.length === 0){
          this.time = "00:00:00"
        }else{
          var time =finalData.reduce(this.add)
          this.time = this.loginActivityService.convertMsToHM(time)
        }
      })
    }else{
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.loginActivityService.convertMsToHM(time)
      })
    }
  }



  changeYear(event){
    if(event != undefined){
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin = data
        this.file=this.datasFromLogin.filter(obj => obj.year === event)
        var finalData = this.file.map((obj)=>{
          return obj.totalTime
        })
        if(finalData.length === 0){
          this.time = "00:00:00"
        }else{
          var time =finalData.reduce(this.add)
          this.time = this.loginActivityService.convertMsToHM(time)
        }    
      })
    }else{
      this.loginActivityService.getData(this.uid).subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.loginActivityService.convertMsToHM(time)
      })
    }
  }
  add(total,num){
    return total + num
  }

  
}
