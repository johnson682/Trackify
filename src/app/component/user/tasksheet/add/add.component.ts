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
  today:any
  addtaskForm:FormGroup
  id:any
  uid:any
  upstartedDate=false

  isOpen = false;

  
  year:any;
  month:any;
  projectName:any
  day:any
  date:any
  singleDate:any

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
    this.uid = data.uid
    this.upstartedDate =false

    this.today = new Date()
    this.addtaskForm = new FormGroup({
      'startedDate':new FormControl('',Validators.required),
      'description':new FormControl('',Validators.required),
      "projectType":new FormControl(this.projectName,Validators.required)
    })
  }

  onSubmit(){
    let startedDate = this.date
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.projectType
    let month =this.month
    let year = this.year
    let date = this.singleDate
    this.tasksheet.add(this.uid,{startedDate,description,month,year,projectType,date})
    this.onCancel()
    this.toastr.showSuccess('Successfully Added','Well Done!!!')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()
  }

  change(event){
    console.log(event);
    const month=new Date(event).getMonth()
    
    const date=new Date(event).toLocaleDateString()
    const givenmonth=this.tasksheet.getMonths(month)
    const year=new Date(event).getFullYear()
    const singleDate = new Date(event).getDate()

    this.date = `${date}`
    this.singleDate = `${singleDate}`
    this.month = `${givenmonth}`
    this.year=`${year}`
    
    
  }
 

  
}
