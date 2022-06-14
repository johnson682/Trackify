import { Component, OnInit } from '@angular/core';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';
import { threadId } from 'worker_threads';

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
  day=[]
  constructor(
    private loginActivityService:UserloginActivityService,
    private tasksheetService:TasksheetService,
    private timetrackerService:TimeTrackerService) { }

  ngOnInit(): void {

    this.month= this.tasksheetService.getMonth()

    this.task={day:new Date().getDate(),month:this.month,year:new Date().getFullYear()}
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

    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      this.datasFromTimetracker = data
      const datas=this.datasFromTimetracker.filter(obj=>obj.status==='complete' && obj.date === new Date().getDate() && obj.month === this.tasksheetService.getMonth() && obj.year === new Date().getFullYear())
      this.totalTask = datas.length
    })
  }

  file:any

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
      this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.date === event)
        console.log(datas);
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        console.log(totalTask);
        if(totalTask.length === 0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
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
      this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.month === event)
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        console.log(totalTask);
        if(totalTask.length ==0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
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
      this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
        this.datasFromTimetracker = data
        const datas = this.datasFromTimetracker.filter( obj => obj.year === event)
        
        const totalTask=datas.filter(obj => obj.status === 'complete')
        console.log(totalTask);
        if(totalTask.length ==0){
          this.totalTask =0
        }else{
          this.totalTask= totalTask.length
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
      this.timetrackerserviceElse()
    }
  }
  add(total,num){
    return total + num
  }


  timetrackerserviceElse(){
    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      this.datasFromTimetracker = data
      const datas = this.datasFromTimetracker.filter(obj=>obj.status ==='complete')
      this.totalTask = datas.length
    })
  }

}
