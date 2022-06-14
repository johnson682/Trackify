import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';
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

  projectStatus=['complete','progress']

  constructor(
    private timetrackerService:TimeTrackerService,
    private tasksheetservice:TasksheetService,
    private tostr:NotificationService) { }

  ngOnInit(): void {
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,id){
    if(event ==='complete'){
      let ended = this.timetrackerService.getCurrentTimeInTaskStartEndFormat()
      this.timetrackerService.updateTask(this.uid,id,{status:event,endedDate:ended})
    }else{
      this.timetrackerService.updateTask(this.uid,id,{status:event})
    }
  }

  delete(id){
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
        this.timetrackerService.deleteTask(this.uid,id)
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
    this.tostr.showSuccess('well Done!!!','Successfully Added to Tasksheet')
  }

}
