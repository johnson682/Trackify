import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';


@Component({
  selector: 'app-addtimetracker',
  templateUrl: './addtimetracker.component.html',
  styleUrls: ['./addtimetracker.component.scss']
})
export class AddtimetrackerComponent implements OnInit {

  addTimeTrackerForm:FormGroup;
  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  type:any
  userData:any
  constructor(
    private router:Router,
    private toastr:NotificationService,
    private tasksheetservice:TasksheetService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'))

    this.addTimeTrackerForm = new FormGroup({
      "projectType":new FormControl(this.type,Validators.required),
      "projectName":new FormControl('',Validators.required),
      "projectDescription":new FormControl('',Validators.required)
    })
  }

  onSubmit(){

    this.toastr.sweetalert2('success','Task Added Successfully')
    let projectType =  this.addTimeTrackerForm.value.projectType
    let projectName = this.addTimeTrackerForm.value.projectName
    let projectDescription = this.addTimeTrackerForm.value.projectDescription
    let status = "progress"
    let started = moment().format('DD-MM-YYYY, h:mm:ss a') 
    let ended = ""
    let month = moment().format('MMM')
    let year = new Date().getFullYear()
    let day= moment().format('dddd');
    let date=new Date().getDate();
    this.tasksheetservice.add(
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
        day:day,
        date:date
        
      },
      'taskTracker'
    )
    this.onCancel()
  }


  onCancel(){
    this.router.navigate(['/user/timetracker/timeTrackerTable'])
    document.getElementById("closeModalButton").click();
  }



}
