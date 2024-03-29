import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  selector: 'app-timetracker-table',
  templateUrl: './timetracker-table.component.html',
  styleUrls: ['./timetracker-table.component.scss']
})
export class TimetrackerTableComponent implements OnInit {
  uid:any
  projects:any

  month:any;
  year:any;
  projectStatus=['complete','progress']

  constructor(
    private tasksheetservice:TasksheetService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.month = moment().format('MMM');
    this.year = new Date().getFullYear()
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.tasksheetservice.getAllTask(this.uid,{month:this.month,year:this.year},'taskTracker').subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,task){
    if(event ==='complete'){
      let ended = moment().format('DD-MM-YYYY, h:mm:ss a') ;
      this.tasksheetservice.updateTask(this.uid,task.uid,{status:event,endedDate:ended,month:task.month,year:task.year},'taskTracker')
    }else{
      this.tasksheetservice.updateTask(this.uid,task.uid,{status:event,month:task.month,year:task.year},'taskTracker')
    }
  }

  delete(task){
    this.notificationService.sweetalert2Modal(
      'Are you sure want to remove?',
      'You will not be able to recover this file!',
      'warning',
      true,
      'Yes, delete it!',
      'No, keep it'
    ).then((result) => {
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
