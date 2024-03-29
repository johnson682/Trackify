import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';
import { NotificationService } from 'src/app/service/notification.service';
import * as moment from 'moment';
import { ExcelsheetService } from 'src/app/service/excelsheet.service';
import { concatAll, map } from 'rxjs';
import Swal from 'sweetalert2';
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
  month:any;
  task:any;
  year:any

  userData:any;
  config:any;
  constructor(
    private tasksheet:TasksheetService,
    private router:Router,
    private route:ActivatedRoute,
    private notificationService:NotificationService,
    private excelsheetService:ExcelsheetService) { 
      
    this.config={
      currentPage: 1,
      itemsPerPage:4,
      totalItems:0
    }
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1
    );
  }
  loading= false;
  pageChange(newPage) {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
      this.router.navigate(['user/user-main/tasksheet'], { queryParams: { page: newPage } });
    },1000)
  }

  ngOnInit(): void {
    this.month= moment().format('MMM')
    this.year =new Date().getFullYear()
    this.task={month:this.month,year:this.year,localDate:''}
    for(let i=2022;i<=2040;i++){
      this.years.push(i)
    }
    this.userData=JSON.parse(localStorage.getItem('user'))
    this.uid =this.userData.uid
    this.onFetchData()
  }

  onFetchData(){
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      this.tasks = data
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

  data:any[] = []
  fullMonth:any;
  exportExcel(){
    this.fullMonth =moment().format('MMMM')
    if(this.tasks.length > 0){
      for(let i=0 ;i<this.tasks.length;i++){
        this.data.push({
          SNO:i+1,
          DATE:this.tasks[i].localDate,
          DAY:this.tasks[i].day,
          TASK:this.tasks[i].Description
        })
      }
      this.excelsheetService.exportAsExcelFile(this.data,`Tasksheet ${this.month}-${this.year}`,'tasksheet')
      // const data =this.tasks.map(({uid,month,year,date,...rest})=>{
      //   return rest
      // }) //for remove specific field of arraf of object
      this.data =[]
    }else{
      Swal.fire({
        title:'Oops...',
        text:'No Data Found',
        icon:'error',
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        },
      })
    }
  }

  changeMonth(event){
    if(event != undefined){
      this.month = event
      this.fullMonth =moment(event).format('MMMM')
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
