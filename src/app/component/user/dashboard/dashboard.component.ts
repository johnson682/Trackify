import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as _ from 'underscore';
import { TasksheetService } from 'src/app/service/tasksheet.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTask=0;
  datasFromLogin:any;datasFromTimetracker:any;uid:any;
  file:any
  
  time:any;month:any;task:any;year:any
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[];
  date=[];
  dateTotal:any;
  constructor(
    private tasksheetService:TasksheetService) { }

  ngOnInit(): void {

    this.month= moment().format('MMM')
    this.year =new Date().getFullYear()
    this.task={day: new Date().getDate(),month:this.month,year:this.year}
    const monthNum = moment().format('M')
    this.dateTotal = this.getDaysInMonth(monthNum,this.year)
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    
    for(let i=1;i<=this.dateTotal;i++){
      this.date.push(i)
    }
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.init()
    
  }
  init(){
    let date = new Date().getDate()
    let month = moment().format('MMM')
    let year = new Date().getFullYear()
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.chart(this.datasFromLogin)
      this.file=this.datasFromLogin.filter(obj =>obj.month === month && obj.year === year )
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
      this.chart2(this.datasFromTimetracker)
      const datas=this.datasFromTimetracker.filter(obj=>obj.month === month && obj.year === year)
      this.totalTask = datas.length
    })
  }

  // changeDay(event){
  //   if(event != undefined){
  //     this.dataFromEventChange(event,this.uid,this.month,this.year,'ActivityLog')
  //     this.dataFromEventChange(event,this.uid,this.month,this.year,'task')
  //   }else{
  //     this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
  //       this.datasFromLogin=data
  //       var finalData = this.datasFromLogin.map((obj)=>{
  //         return obj.totalTime
  //       })
  //       var time = finalData.reduce(this.add)
  //       this.time = this.tasksheetService.convertMsToHM(time)
  //     })
  //     this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
  //       this.datasFromTimetracker = data
  //       this.totalTask = this.datasFromTimetracker.length
  //     })
  //   }
  // }
  getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  };

  changeMonth(event){
    if(event != undefined){
      this.month = event
      let temp =[];
      
      const monthNum = moment().month(event).format('M')
      this.dateTotal = this.getDaysInMonth(monthNum,this.year)
      for(let i=1;i<=this.dateTotal;i++){
        temp.push(i)
      }
      this.date = [...temp]
      this.dataFromEventChange(event,this.uid,this.month,this.year,'ActivityLog')
      this.dataFromEventChange(event,this.uid,this.month,this.year,'task')
    }
  }

  changeYear(event){
    if(event != undefined){
      this.year= event
      let temp =[];
      const monthNum = moment().month(this.month).format('M')
      this.dateTotal = this.getDaysInMonth(monthNum,this.year)
      for(let i=1;i<=this.dateTotal;i++){
        temp.push(i)
      }
      this.date = [...temp]
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
        this.chart(this.datasFromLogin)
        this.file=this.datasFromLogin.filter(obj => obj.month === event || obj.year === event)
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
        this.chart2(this.datasFromTimetracker)
        const datas = this.datasFromTimetracker.filter( obj => obj.month === event || obj.year === event)
        if(datas.length === 0){
          this.totalTask =0
        }else{
          this.totalTask= datas.length
        }
      })
    }
  }

  chartData:any;
  chartLabels:any;
  chartOptions:any;
  charStatus = false
  chart(datasFromLogin){
    if(datasFromLogin.length > 0 ){
      this.charStatus = true;
    }else{
      this.charStatus = false
    }
   
    const d = _.groupBy(datasFromLogin,'date')
    let arr=[]
    for(let group in d){
      arr.push(group)
    }
    let datas:any[]=[]
    
    datasFromLogin.forEach(element=>{
      arr.forEach(ele=>{
        if(element.date == ele){
          var array = element.totalHours.split(":");
          var minutes = (parseInt(array[0], 10) * 60 ) + (parseInt(array[1], 10))
          datas.push(minutes)
        }
      })
    })
    
    this.chartData = [{label:this.year+'/'+ this.month,data:datas}];
    this.chartLabels =arr;
    this.chartOptions = {
      responsive: true,
    };
  }
  chart2Data:any;
  chart2Labels:any;
  chart2Options:any;
  char2Status = false
  chart2(datasFromTimetracker){
  
    if(datasFromTimetracker.length > 0 ){
      this.char2Status = true;
    }else{
      this.char2Status = false
    }
   
    const d = _.groupBy(datasFromTimetracker,'date')
    let arr=[]
    for(let group in d){
      arr.push(group)
    }
    let datas:any[]=[]
    let count =0
    datasFromTimetracker.forEach(element=>{
      arr.forEach(ele=>{
        if(element.date == ele){
          count += 1 
          datas.push(count)
        }
      })
    })
    this.chart2Data = [{label:this.year+'/'+ this.month,data:datas}];
    this.chart2Labels =arr;
    this.chart2Options = {
      responsive: true,
    };
  }
  
}
