import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TaskTrackerService } from 'src/app/service/timetracker.service';
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
    private timetrackerService:TaskTrackerService,
    private tasksheetservice:TasksheetService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.month = this.tasksheetservice.getMonth()
    this.year = new Date().getFullYear()
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.timetrackerService.getAllTaskTracker(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,task){
    if(event ==='complete'){
      let ended = this.timetrackerService.getCurrentTimeInTaskStartEndFormat()
      this.timetrackerService.updateTask(this.uid,task.id,{status:event,endedDate:ended,month:task.month,year:task.year})
    }else{
      this.timetrackerService.updateTask(this.uid,task.id,{status:event,month:task.month,year:task.year})
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
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.timetrackerService.deleteTask(this.uid,task.id,{month:task.month,year:task.year})
        this.notificationService.sweetalert2('error','Task Deleted!!')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
   })
    
  }

  

  add(task){
    this.tasksheetservice.add(this.uid,task)
    this.notificationService.sweetalert2('success','Task Added to Tasksheet Successfully')
  }

}
