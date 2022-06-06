import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { TimeTrackerService } from 'src/app/service/timetracker.service';

@Component({
  selector: 'app-addtimetracker',
  templateUrl: './addtimetracker.component.html',
  styleUrls: ['./addtimetracker.component.css']
})
export class AddtimetrackerComponent implements OnInit {

  addTimeTrackerForm:FormGroup;
  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  type:any
  userData:any
  constructor(
    private router:Router,
    private spinnerService:NgxSpinnerService,
    private timetrackerService:TimeTrackerService,
    private tasksheetservice:TasksheetService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    console.log(this.type);
    
    this.userData = JSON.parse(localStorage.getItem('user'))

    this.addTimeTrackerForm = new FormGroup({
      "projectType":new FormControl(this.type,Validators.required),
      "projectName":new FormControl('',Validators.required),
      "projectDescription":new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    console.log(this.addTimeTrackerForm.value);
    let projectType =  this.addTimeTrackerForm.value.projectType
    let projectName = this.addTimeTrackerForm.value.projectName
    let projectDescription = this.addTimeTrackerForm.value.projectDescription
    let status = "progress"
    let started = this.timetrackerService.getCurrentTimeInTaskStartEndFormat()
    let ended = ""
    let month = this.tasksheetservice.getMonth()
    let year = new Date().getFullYear()
    let day= this.tasksheetservice.getDay()

    this.timetrackerService.add(
      this.userData.uid,
      {
        projectType:projectType,
        projectName:projectName,
        description:projectDescription,
        status:status,
        startedDate:started,
        endedDate:ended,
        month:month,
        year:year,
        day:day
        
      }
    )
    this.onCancel()
  }


  onCancel(){
    this.router.navigate(['/user/timetracker'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }



}
