import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-login-activity',
  templateUrl: './employee-login-activity.component.html',
  styleUrls: ['./employee-login-activity.component.scss']
})
export class EmployeeLoginActivityComponent implements OnInit {

  fileName='ExcelSheet.xlsx'
  
  uid:any;

  month:any;task:any;year:any
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[];date=[]

  constructor(
    private tasksheetService:TasksheetService) { }

  ngOnInit(): void {
    this.month= moment().format('MMM')
    this.year=moment().format('YYYY')
    this.task={date:moment().format('DD'),month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=31;i++){
      this.date.push(i)
    }
    const userData= JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = userData
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
  }
  
  exportExcel(){
    let element = document.getElementById('table-sheet')
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'sheet1')
    XLSX.writeFile(wb,this.fileName)
  }

  datasFromLogin:any
  file:any
  time:any;

  changeDay(event){
  
    if(event != undefined){
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
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
  changeMonth(event){
    this.month = event
    if(event != undefined){
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
    }
  }

  changeYear(event){
    this.year=event
    if(event != undefined){
      this.dataFronChangeEvent(event,this.uid,this.month,this.year)
    }
  }
  
  add(total,num){
    return total + num
  }

  dataFronChangeEvent(event,uid,month,year){
    this.tasksheetService.getAllTask(uid,{month:month,year:year},'ActivityLog').subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === event || obj.month === event || obj.year === event)
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
