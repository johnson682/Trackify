import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-userlogin-activity',
  templateUrl: './userlogin-activity.component.html',
  styleUrls: ['./userlogin-activity.component.css']
})
export class UserloginActivityComponent implements OnInit {
  uid:any
  startTime:any
  stopTime:any
  
  fileName:any

  LocalTimeStart:any
  localTimeEnd:any
  status = false
  tasks:any

  month:any;
  date=[]
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  
  constructor(
    private loginActivityService:UserloginActivityService,
    private tasksheetService:TasksheetService,
    private timetrackerService:TimeTrackerService,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    this.month= this.tasksheetService.getMonth()
    
    this.task={date:new Date().getDate(),month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=31;i++){
      this.date.push(i)
    }


    const userData= JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid

    this.LocalTimeStart = JSON.parse(localStorage.getItem('LocalTimeStart'))
    this.localTimeEnd = JSON.parse(localStorage.getItem('localTimeEnd'))
    this.startTime = JSON.parse(localStorage.getItem('startTime'))
    this.stopTime = JSON.parse(localStorage.getItem('stopTime'))

    
    if(this.LocalTimeStart != undefined && this.localTimeEnd != undefined){
      this.status = true
    }

    this.loginActivityService.getData(this.uid).subscribe(data=>{
      this.datasFromLogin = data
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
  
  onStart(){
    this.LocalTimeStart= new Date().toLocaleTimeString()
    localStorage.setItem('LocalTimeStart',JSON.stringify(this.LocalTimeStart))
    this.startTime = new Date().getTime()
    localStorage.setItem('startTime',JSON.stringify(this.startTime))
  }

  onStop(){
    this.localTimeEnd = new Date().toLocaleTimeString()
    localStorage.setItem('localTimeEnd',JSON.stringify(this.localTimeEnd))
    this.stopTime = new Date().getTime()
    localStorage.setItem('stopTime',JSON.stringify(this.stopTime))
    if(this.LocalTimeStart != undefined && this.localTimeEnd != undefined){
      this.status = true
    }

    let time = this.stopTime - this.startTime
    let timehrs =this.loginActivityService.convertMsToHM(time)
    let date=new Date().getDate()
    let localDate =new Date().toLocaleDateString()
    let month = this.tasksheetService.getMonth()
    let day= this.tasksheetService.getDay() 
    let year = new Date().getFullYear()



    this.loginActivityService.add(
      this.uid,
      {
        localDate:localDate,
        startTime:this.LocalTimeStart,
        endTime:this.localTimeEnd,
        totalTime:time,
        day:day,
        date:date,
        month:month,
        year:year,
        totalHours:timehrs
      }
    )
    this.clear()
  }

  clear(){
    localStorage.removeItem('LocalTimeStart')
    localStorage.removeItem('localTimeEnd')
    localStorage.removeItem('startTime')
    localStorage.removeItem('stopTime')
    this.LocalTimeStart =""
    this.localTimeEnd =""
  }
  
  delete(id){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.loginActivityService.delete(this.uid,id)
        localStorage.removeItem('LocalTimeStart')
        localStorage.removeItem('localTimeEnd')
        localStorage.removeItem('startTime')
        localStorage.removeItem('stopTime')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
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
