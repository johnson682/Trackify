import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
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
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  
  constructor(
    private loginActivityService:UserloginActivityService,
    private tasksheetService:TasksheetService,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    this.month= this.tasksheetService.getMonth()
    
    this.task={month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
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
      this.tasks = data
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
  }
  save(){
    let time = this.stopTime - this.startTime
    let timehrs =this.convertMsToHM(time)

    let date=new Date().getDate()
    let localDate =new Date().toLocaleDateString()
    let month = this.tasksheetService.getMonth()
    let day= this.tasksheetService.getDay() 
    let year = new Date().getFullYear()

    if(date === new Date().getDate() ){
      this.status = false
    }


    this.loginActivityService.add(
      this.uid,
      {
        localDate:localDate,
        startTime:this.LocalTimeStart,
        endTime:this.localTimeEnd,
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

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
  }
}
