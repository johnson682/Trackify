import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalHRS =0;totalTask=0;
  datasFromLogin:any;datasFromTimetracker:any;uid:any;
  file:any
  
  time:any;month:any;task:any;year:any
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[];day=[]

  constructor(
    private tasksheetService:TasksheetService) { }

  ngOnInit(): void {

    this.month= moment().format('MMM')
    this.year =new Date().getFullYear()
    this.task={day: new Date().getDate(),month:this.month,year:this.year}
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
      this.file=this.datasFromLogin.filter(obj => obj.date === new Date().getDate() && obj.month === moment().format('MMM') && obj.year === this.year )
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

    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.datasFromTimetracker = data
      const datas=this.datasFromTimetracker.filter(obj=>obj.date ===new Date().getDate() && obj.month === moment().format('MMM') && obj.year === this.year)
      this.totalTask = datas.length
    })
  }


  changeDay(event){
  
    if(event != undefined){
      this.dataFromEventChange(event,this.uid,this.month,this.year,'ActivityLog')
      this.dataFromEventChange(event,this.uid,this.month,this.year,'task')
 
    }else{
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
        this.datasFromLogin=data
        var finalData = this.datasFromLogin.map((obj)=>{
          return obj.totalTime
        })
        var time = finalData.reduce(this.add)
        this.time = this.tasksheetService.convertMsToHM(time)
      })
      this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
        this.datasFromTimetracker = data
        this.totalTask = this.datasFromTimetracker.length
      })
    }
  }
  changeMonth(event){
    if(event != undefined){
      this.month = event
      this.dataFromEventChange(event,this.uid,this.month,this.year,'ActivityLog')
      this.dataFromEventChange(event,this.uid,this.month,this.year,'task')
    }
  }

  changeYear(event){
    if(event != undefined){
      this.year= event
      this.dataFromEventChange(event,this.uid,this.month,this.year,'ActivityLog')
      this.dataFromEventChange(event,this.uid,this.month,this.year,'task')
    }
  }

  add(total,num){
    return total + num
  }

  dataFromEventChange(event,uid,month,year,collectionName){
    if(collectionName == 'ActivityLog'){
      this.tasksheetService.getAllTask(uid,{month:month,year:year},collectionName).subscribe(data=>{
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
    }else if(collectionName == 'task'){
      this.tasksheetService.getAllTask(uid,{month:month,year:year},collectionName).subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.date === event)
        if(datas.length === 0){
          this.totalTask =0
        }else{
          this.totalTask= datas.length
        }
      })
    }
  }

}
