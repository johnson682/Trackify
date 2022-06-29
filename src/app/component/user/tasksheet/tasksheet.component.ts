import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';
import { NotificationService } from 'src/app/service/notification.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tasksheet',
  templateUrl: './tasksheet.component.html',
  styleUrls: ['./tasksheet.component.scss']
})
export class TasksheetComponent implements OnInit {

  monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  fileName='ExcelSheet.xlsx'
  years=[]

  tasks:any
  uid:any
  order:string
  month:any;
  task:any;
  year:any

  constructor(
    private tasksheet:TasksheetService,
    private router:Router,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.month= moment().format('MMM')
    this.year =new Date().getFullYear()
    this.task={month:this.month,year:this.year}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.onFetchData()
  }

  onFetchData(){
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.tasks = data
      this.order = 'date'
    }) 
  }

  onEditTask(task){
    this.router.navigate(['/user/user-main/tasksheet/'+task.year+'/'+task.month+'/'+task.uid])
  }

  onDelete(task){
    this.notificationService.sweetalert2Modal(
      'Are you sure want to remove?',
      'You will not be able to recover this file!',
      'warning',true,
      'Yes, delete it!',
      'No, keep it').then((result) => {
      if (result.value) {
        this.tasksheet.deleteTask(this.uid,task.uid,{month:task.month,year:task.year},'task')
        this.notificationService.sweetalert2('error','Task Deleted!!')
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
    if(event != undefined){
      this.month = event
      this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
        this.tasks = data
      })
    }
  }

  changeYear(event){
    this.year = event
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.tasks = data
    })
  }
  
}
