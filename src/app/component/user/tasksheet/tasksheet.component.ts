import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tasksheet',
  templateUrl: './tasksheet.component.html',
  styleUrls: ['./tasksheet.component.css']
})
export class TasksheetComponent implements OnInit {

  constructor(
    private tasksheet:TasksheetService,
    private router:Router) { }

  tasks:any
  id:any
  uid:any
  data:any

  
  fileName='ExcelSheet.xlsx'
  
  month:any;
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  
  ngOnInit(): void {
    this.month= this.tasksheet.getMonth()
    
    this.task={month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }

    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    
    this.onFetchData()
   
  }

  onFetchData(){
    this.tasksheet.getAllTask(this.uid).subscribe(data=>{
      console.log(data);
      this.tasks = data
    }) 
  }

  onEditTask(id){
    this.router.navigate(['/user/tasksheet/'+id])
  }

  onDelete(id){
    console.log(id);
    
    this.tasksheet.deleteTask(this.uid,id)
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.onFetchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.onFetchData();
  }

  exportExcel(){
    let element = document.getElementById('table-sheet')
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'sheet1')

    XLSX.writeFile(wb,this.fileName)
  }

  
}
