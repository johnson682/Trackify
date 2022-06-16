import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalHRS =0
  totalTask=0
  datasFromLogin:any
  datasFromTimetracker:any
  uid:any
  time:any
  
  month:any;
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  year:any
  day=[]
  constructor(
    private tasksheetService:TasksheetService) { }

  ngOnInit(): void {

    this.month= moment().format('MMM')
    this.year = moment().format('YYYY')
    this.task={day: moment().format('DD'),month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=31;i++){
      this.day.push(i)
    }
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.init()
  }
  init(){
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === moment().format('DD') && obj.month === moment().format('MMM') && obj.year === this.year )
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

    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
      this.datasFromTimetracker = data
      const datas=this.datasFromTimetracker.filter(obj=>obj.status==='complete' && obj.date ===moment().format('DD') && obj.month === moment().format('MMM') && obj.year === moment().format('YYYY'))
      this.totalTask = datas.length
    })
  }

  file:any

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
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.date === event)
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        if(totalTask.length === 0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
    }
  }
  changeMonth(event){
    this.month = event
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
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.month === event)
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        if(totalTask.length ==0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
    }
  }



  changeYear(event){
    this.year= event
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
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.year === event)
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        if(totalTask.length ==0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
    }
  }
  add(total,num){
    return total + num
  }


  timetrackerserviceElse(){
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
      this.datasFromTimetracker = data
      const datas = this.datasFromTimetracker.filter(obj=>obj.status ==='complete')
      this.totalTask = datas.length
    })
  }

}
