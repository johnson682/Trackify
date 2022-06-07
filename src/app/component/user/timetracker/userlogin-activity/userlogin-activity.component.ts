import { Component, OnInit } from '@angular/core';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';

@Component({
  selector: 'app-userlogin-activity',
  templateUrl: './userlogin-activity.component.html',
  styleUrls: ['./userlogin-activity.component.css']
})
export class UserloginActivityComponent implements OnInit {
  uid:any
  startTime:any
  stopTime:any
  
  LocalTimeStart:any
  localTimeEnd:any
  status = false
  datas:any
  constructor(private loginActivityService:UserloginActivityService,private tasksheetService:TasksheetService) { }

  ngOnInit(): void {
    const userData= JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.LocalTimeStart = JSON.parse(localStorage.getItem('LocalTimeStart'))
    this.localTimeEnd = JSON.parse(localStorage.getItem('localTimeEnd'))
    console.log(this.LocalTimeStart);
    
    if(this.LocalTimeStart != undefined && this.localTimeEnd != undefined){
      this.status = true
    }
    this.loginActivityService.getData(this.uid).subscribe(data=>{
      console.log(data);
      this.datas = data
    })
  }
  
  onStart(){
    this.LocalTimeStart= new Date().toLocaleTimeString()
    localStorage.setItem('LocalTimeStart',JSON.stringify(this.LocalTimeStart))
    this.startTime = new Date().getTime()

  }

  onStop(){
    this.localTimeEnd = new Date().toLocaleTimeString()
    localStorage.setItem('localTimeEnd',JSON.stringify(this.localTimeEnd))
    this.stopTime = new Date().getTime()

    if(this.LocalTimeStart != undefined && this.localTimeEnd != undefined){
      this.status = true
    }
  }
  save(){

    let date=new Date().getDate()
    let localDate =new Date().toLocaleDateString()

    let time = this.stopTime - this.startTime
    let timehrs =this.convertMsToHM(time)
    
    let month = this.tasksheetService.getMonth()
    let day= this.tasksheetService.getDay() 
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
        totalHours:timehrs
      }
    )
    localStorage.removeItem('LocalTimeStart')
    localStorage.removeItem('localTimeEnd')
    this.LocalTimeStart =""
    this.localTimeEnd =""
  }  
  
  delete(id){
    this.loginActivityService.delete(this.uid,id)
    localStorage.removeItem('LocalTimeStart')
    localStorage.removeItem('localTimeEnd')
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
  
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
  
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
  }
}
