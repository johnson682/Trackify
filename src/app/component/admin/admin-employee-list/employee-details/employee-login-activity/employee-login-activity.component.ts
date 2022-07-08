import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExcelsheetService } from 'src/app/service/excelsheet.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-login-activity',
  templateUrl: './employee-login-activity.component.html',
  styleUrls: ['./employee-login-activity.component.scss']
})
export class EmployeeLoginActivityComponent implements OnInit {

  uid:any;
  month:any;task:any;year:any
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[];date=[]

  userData:any;
  datasFromLogin:any
  file:any
  time:any;
  dateTotal:any;
  exportData:any[]=[]


  constructor(
    private tasksheetService:TasksheetService,private userService:UserService,private excelsheetService:ExcelsheetService
  ) { }

  ngOnInit(): void {
    
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

    let date = new Date().getDate()

    const userData= JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = userData
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === date && obj.month === this.month && obj.year === this.year )   
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
  

  exportExcel(){
    this.userService.getData(this.uid).subscribe(data=>{
      this.userData = data
      for(let i=0 ;i<this.datasFromLogin.length ;i++){
        this.exportData.push({
          Date:this.datasFromLogin[i].localDate,
          StartTime:this.datasFromLogin[i].startTime,
          EndTime:this.datasFromLogin[i].endTime,
          TotalWorkHRS:this.datasFromLogin[i].totalHours
        })
      }
      this.excelsheetService.exportAsExcelFile(this.exportData,`${this.userData.name}/${this.year}/${this.month}/LoginActivity`)
    })
  }

  getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  };

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
