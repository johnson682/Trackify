import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private timetrackerService:TimeTrackerService) { }

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
    let started = this.getCurrentTimeInTaskStartEndFormat()
    let ended = ""

    this.timetrackerService.add(
      this.userData.uid,
      {
        projectType:projectType,
        projectName:projectName,
        projectDescription:projectDescription,
        status:status,
        started:started,
        ended:ended,
        
      }
    )
    this.onCancel()
  }


  onCancel(){
    this.router.navigate(['/user/timetracker'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
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
