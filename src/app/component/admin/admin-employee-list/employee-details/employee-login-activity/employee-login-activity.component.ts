import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserloginActivityService } from 'src/app/service/userlogin-activity.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-login-activity',
  templateUrl: './employee-login-activity.component.html',
  styleUrls: ['./employee-login-activity.component.scss']
})
export class EmployeeLoginActivityComponent implements OnInit {

  fileName='ExcelSheet.xlsx'
  
  uid:any

  month:any;
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]
  year:any
  date=[]
  constructor(
    private loginActivityService:UserloginActivityService,
    private tasksheetService:TasksheetService,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    this.month= this.tasksheetService.getMonth()
    this.year=new Date().getFullYear()
    this.task={date:new Date().getDate(),month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    for(let i=1;i<=31;i++){
      this.date.push(i)
    }
    const userData= JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = userData
    this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.datasFromLogin = data
      this.file=this.datasFromLogin.filter(obj => obj.date === new Date().getDate() && obj.month === this.tasksheetService.getMonth() && obj.year === this.year )
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
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
    this.month = event
    if(event != undefined){
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
    this.year=event
    if(event != undefined){
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
      this.loginActivityService.getData(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
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
