import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExcelsheetService } from 'src/app/service/excelsheet.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-employee-tasksheet',
  templateUrl: './employee-tasksheet.component.html',
  styleUrls: ['./employee-tasksheet.component.scss']
})
export class EmployeeTasksheetComponent implements OnInit {

  uid:any;employeeDetails:any
  order:any
  userData:any;
  exportData:any[]=[]

  monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  task:any;year:any;month:any;years=[]

  constructor(private tasksheetService:TasksheetService,private excelsheetService:ExcelsheetService,private userService:UserService) { }

  ngOnInit(): void {
    this.order = 'date'
    this.year = new Date().getFullYear()
    this.month=moment().format('MMM')
    this.task={month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    const data=JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = data
    this.fetchData()
  }

  fetchData(){
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.employeeDetails = data
    })
  }

  exportExcel(){
    this.userService.getData(this.uid).subscribe(data=>{
      this.userData=data
      for(let i=0 ;i<this.employeeDetails.length;i++){
        this.exportData.push({
          SNO:1+1,
          Date:this.employeeDetails[i].Date,
          Day:this.employeeDetails[i].day,
          Description:this.employeeDetails[i].Description
        })
      }
      this.excelsheetService.exportAsExcelFile(this.exportData,`${this.userData.name}/${this.year}/${this.month}/tasksheet`)
    })
  }

  changeMonth(event){
    this.order = 'date'
    this.month = event
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.employeeDetails = data
    })
  }

  changeYear(event){
    this.order = 'date'
    this.year = event
    this.tasksheetService.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.employeeDetails = data
    })
  }

  
}
