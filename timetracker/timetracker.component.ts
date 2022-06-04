import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, timer } from 'rxjs';
import { TimeTrackerService } from 'src/app/service/timetracker.service';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-timetracker',
  templateUrl: './timetracker.component.html',
  styleUrls: ['./timetracker.component.css']
})
export class TimetrackerComponent implements OnInit {

  uid:any
  projects:any
  task:any


 

  constructor(private timetrackerService:TimeTrackerService) { }

  ngOnInit(): void {
    const userData=JSON.parse(localStorage.getItem('user'))
    this.uid =userData.uid
    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      this.projects = data
    })
  }

  onChangeStatus(event,id){
    if(event.target.value ==='start'){
      this.timetrackerService.updateTask(this.uid,id,{status:event.target.value})
    }else if(event.target.value === 'stop'){
      this.timetrackerService.updateTask(this.uid,id,{status:event.target.value})
    } else if(event.target.value === 'complete'){
      this.timetrackerService.updateTask(this.uid,id,{status:event.target.value})
    }else{
      this.timetrackerService.updateTask(this.uid,id,{status:event.target.value})
    }
    
    
    
    this.timetrackerService.getAllTimeTracker(this.uid).subscribe(data=>{
      data.forEach(ele=>{
        this.task = ele
        if(this.task.id === id){
          if(this.task.status == 'complete'){
            let ended = this.getCurrentTimeInTaskStartEndFormat()
            if(this.task.ended = ""){
              this.timetrackerService.updateTask(this.uid,id,{ended:ended}) 
            }
          }
        }
      })
      
    })
    


  }

  delete(id){
    this.timetrackerService.deleteTask(this.uid,id)

  }
  getCurrentTimeInTaskStartEndFormat() {
    let current_datetime = new Date();
    let date = current_datetime.getDate();
    date = (date < 10) ? +"0" + date : date;
    let month = (current_datetime.getMonth() + 1);
    month = (month < 10) ? +"0" + month : month;
    let hours = current_datetime.getHours();
    hours = (hours < 10) ? +"0" + hours : hours;
    let minutes = current_datetime.getMinutes();
    minutes = (minutes < 10) ? +"0" + minutes : minutes;
    let seconds = current_datetime.getSeconds();
    seconds = (seconds < 10) ? +"0" + seconds : seconds;
    let formatted_date = current_datetime.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return formatted_date;
}
}
