import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timetracker-table',
  templateUrl: './timetracker-table.component.html',
  styleUrls: ['./timetracker-table.component.scss']
})
export class TimetrackerTableComponent implements OnInit {
  uid:any
  projects:any
  task:any

  month:any;
  year:any;
  projectStatus=['complete','progress']

  constructor(
    private tasksheetservice:TasksheetService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.month = moment().format('MMM');
    this.year = moment().format('YYYY')
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.tasksheetservice.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,task){
    if(event ==='complete'){
      let ended = moment().format('DD-MM-YYYY, h:mm:ss a') ;
      console.log(ended);
      
      this.tasksheetservice.updateTask(this.uid,task.uid,{status:event,endedDate:ended,month:task.month,year:task.year},'taskTracker')
    }else{
      this.tasksheetservice.updateTask(this.uid,task.uid,{status:event,month:task.month,year:task.year},'taskTracker')
    }
  }

  delete(task){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.tasksheetservice.deleteTask(this.uid,task.uid,{month:task.month,year:task.year},'taskTracker')
        this.notificationService.sweetalert2('error','Task Deleted!!')
      }
   })
    
  }

  

  add(task){
    this.tasksheetservice.add(this.uid,task,'task')
    this.notificationService.sweetalert2('success','Task Added to Tasksheet Successfully')
  }

}
