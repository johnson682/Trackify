import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'

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
    private router:Router,
    private spinnerService:NgxSpinnerService) { }

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
   
    // this.spinner.getSpinner().subscribe(data=>{
    //   console.log(data);
    // })
    this.getMonth()
    this.task={month:this.month,year:new Date().getFullYear()}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }

    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    
    this.onFetchData()
   
  }

  onFetchData(){
    this.tasksheet.getId().doc(this.uid).collection('task').snapshotChanges().pipe(
      map(a=>
        a.map(c=>        
          ({id:c.payload.doc.id,...c.payload.doc.data()})
        )
      )
    ).subscribe(data=>{
      console.log(data);
      this.tasks = data
    }) 
  }

  onEditTask(id){
    this.router.navigate(['/user/tasksheet/'+id])
  }

  onDelete(id){
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

  getMonth(){
    switch(new Date().getMonth()){
      case 0:
        this.month = "Jan";
        break;
      case 1:
        this.month = "Feb";
        break;
      case 2:
        this.month = "Mar";
        break;
      case 3:
        this.month = "Apr";
        break;
      case 4:
        this.month = "May";
        break;
      case 5:
        this.month = "Jun";
        break;
      case 6:
        this.month = "Jul";
        break;
      case 7:
        this.month = "Aug";
        break;
      case 8:
        this.month = "Sep";
        break;
      case 9:
        this.month = "Oct";
        break;
      case 10:
        this.month = "Nov";
        break;
      case 11:
        this.month = "Dec";
    }
  }
}
