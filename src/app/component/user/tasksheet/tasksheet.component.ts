import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
 
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-tasksheet',
  templateUrl: './tasksheet.component.html',
  styleUrls: ['./tasksheet.component.scss']
})
export class TasksheetComponent implements OnInit {

  constructor(
    private tasksheet:TasksheetService,
    private router:Router) { 
      
      
    }

  tasks:any
  id:any
  uid:any
  data:any

  order:string

  fileName='ExcelSheet.xlsx'
  
  month:any;
  task:any;
  year:any
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]

  ngOnInit(): void {
    this.month= this.tasksheet.getMonth()
    this.year = new Date().getFullYear()
    this.task={month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    
    
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.onFetchData()
  }

  onFetchData(){
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.tasks = data

      this.order = 'date'
    }) 
  }

  onEditTask(task){
    this.router.navigate(['/user/tasksheet/'+task.year+'/'+task.month+'/'+task.uid])
    this.tasksheet.taskSheet.next(task)
  }

  onDelete(task){
    console.log(task);
    
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.tasksheet.deleteTask(this.uid,task.uid,{month:task.month,year:task.year})
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
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


  changeMonth(event){
    this.month = event
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.tasks = data
    })
  }

  changeYear(event){
    this.year = event
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.tasks = data
    })
  }
  
}
