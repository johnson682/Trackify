import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-tasksheet',
  templateUrl: './employee-tasksheet.component.html',
  styleUrls: ['./employee-tasksheet.component.scss']
})
export class EmployeeTasksheetComponent implements OnInit {

  uid:any
  employeeDetails:any

  fileName='ExcelSheet.xlsx'

  monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  task:any;
  years=[]
  year:any
  month:any;
  constructor(private route:ActivatedRoute,private employeeTaskSheetService:TasksheetService) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
    this.month=this.employeeTaskSheetService.getMonth()
    this.task={month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    const data=JSON.parse(localStorage.getItem('Employee Uid'))
    this.uid = data
    this.fetchData()
  }

  fetchData(){
    this.employeeTaskSheetService.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.employeeDetails = data
      console.log(data);
    })

    
  }


  exportExcel(){
    let element = document.getElementById('table-sheet')
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'sheet1')

    XLSX.writeFile(wb,this.fileName)
  }

  changeMonth(event){
    this.month = event
    this.employeeTaskSheetService.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.employeeDetails = data
    })
  }

  changeYear(event){
    this.year = event
    this.employeeTaskSheetService.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.employeeDetails = data
    })
  }

  
}
