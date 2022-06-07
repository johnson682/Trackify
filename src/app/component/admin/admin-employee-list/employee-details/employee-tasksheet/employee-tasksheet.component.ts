import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-tasksheet',
  templateUrl: './employee-tasksheet.component.html',
  styleUrls: ['./employee-tasksheet.component.css']
})
export class EmployeeTasksheetComponent implements OnInit {

  uid:any
  employeeDetails:any

  fileName='ExcelSheet.xlsx'

  monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  task:any;
  years=[]

  month:any;
  constructor(private route:ActivatedRoute,private employeeTaskSheetService:TasksheetService) { }

  ngOnInit(): void {
    this.month=this.employeeTaskSheetService.getMonth()
    this.task={month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    const data=JSON.parse(localStorage.getItem('Employee Uid'))
    console.log(data);
    
    this.uid = data
    this.fetchData()
  }

  fetchData(){
    this.employeeTaskSheetService.getAllTask().doc(this.uid).collection('task').snapshotChanges().pipe(
      map(a=>a.map(c=>
          ({uid:c.payload.doc.id,...c.payload.doc.data()})    
      ))
    ).subscribe(data=>{
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

  
}
