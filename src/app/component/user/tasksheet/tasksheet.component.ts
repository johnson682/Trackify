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
  styleUrls: ['./tasksheet.component.css']
})
export class TasksheetComponent implements OnInit {

  constructor(
    private tasksheet:TasksheetService,
    private router:Router) { 
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      
    }

  tasks:any
  id:any
  uid:any
  data:any

  
  fileName='ExcelSheet.xlsx'
  
  month:any;
  task:any;
  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  years=[]

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
    this.tasksheet.getAllTask().doc(this.uid).collection('task').snapshotChanges().pipe(
      map(a=>a.map(c=>
          ({uid:c.payload.doc.id,...c.payload.doc.data()})    
      ))
    ).subscribe(data=>{
      this.tasks = data
    }) 
  }

  onEditTask(id){
    this.router.navigate(['/user/tasksheet/'+id])
  }

  onDelete(id){
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
        this.tasksheet.deleteTask(this.uid,id)
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
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // change(event){
  //   console.log(event[0]);
  //   const Smonth = new Date(event[0]).getMonth()
  //   const Emonth = new Date(event[1]).getMonth()
  //   const startMonth = this.tasksheet.getMonths(Smonth)
  //   const EndMonth = this.tasksheet.getMonths(Emonth)

  //   console.log(startMonth,EndMonth);
    
    
  // }
  
}
