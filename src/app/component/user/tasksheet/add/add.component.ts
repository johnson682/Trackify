import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { TimeTrackerService } from 'src/app/service/timetracker.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addtaskForm:FormGroup
  id:any
  uid:any
  upstartedDate=false

  year:any;
  month:any;
  projectName:any
  day:any

  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private timetrackerService:TimeTrackerService,
    private toastr:NotificationService,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    let data=JSON.parse(localStorage.getItem('user'))
    console.log(data);
    this.uid = data.uid
    
    this.upstartedDate =false
    let startedDate=this.timetrackerService.getCurrentTimeInTaskStartEndFormat()

    this.year = new Date().getFullYear()
    
    this.month=this.tasksheet.getMonth()
    
    this.day=this.tasksheet.getDay()

    
    this.addtaskForm = new FormGroup({
      'startedDate':new FormControl(startedDate,Validators.required),
      'day':new FormControl(this.day,Validators.required),
      'description':new FormControl('',Validators.required),
      "projectType":new FormControl(this.projectName,Validators.required)
    })
  }

  onSubmit(){
    let startedDate = this.addtaskForm.value.startedDate
    let date = new Date().toLocaleDateString()
    let day = this.addtaskForm.value.day
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.projectType
    let month =this.month
    let year = this.year
    this.tasksheet.add(this.uid,{startedDate,day,description,month,year,projectType,date})
    this.onCancel()
    this.toastr.showSuccess('Successfully Added','Well Done!!!')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }

 

  
}
