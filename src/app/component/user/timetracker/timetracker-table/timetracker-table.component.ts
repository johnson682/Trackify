import { Component, OnInit } from '@angular/core';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';

@Component({
  selector: 'app-timetracker-table',
  templateUrl: './timetracker-table.component.html',
  styleUrls: ['./timetracker-table.component.css']
})
export class TimetrackerTableComponent implements OnInit {
  uid:any
  projects:any
  task:any

  projectStatus=['complete','progress']

  constructor(private timetrackerService:TimeTrackerService,private tasksheetservice:TasksheetService) { }

  ngOnInit(): void {
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,id){
    console.log(event);
    
    if(event ==='complete'){
      let ended = this.timetrackerService.getCurrentTimeInTaskStartEndFormat()
      this.timetrackerService.updateTask(this.uid,id,{status:event,endedDate:ended})
    }else{
      this.timetrackerService.updateTask(this.uid,id,{status:event})
    }
  }

  delete(id){
    console.log(id);
    
    this.timetrackerService.deleteTask(this.uid,id)
  }

  

  add(task){
    this.tasksheetservice.add(this.uid,task)
  }

}
