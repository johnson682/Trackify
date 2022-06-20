import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
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
    private toastr:NotificationService) { }

  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid
    this.upstartedDate =false

    this.today = new Date()
    this.addtaskForm = new FormGroup({
      'Name':new FormControl('',Validators.required),
      'startedDate':new FormControl('',Validators.required),
      'description':new FormControl('',Validators.required),
      "projectType":new FormControl(this.projectName,Validators.required)
    })
  }

  onSubmit(){
    
    let startedDate = this.date
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.projectType
    let projectName = this.addtaskForm.value.Name
    let month =this.month
    let year = this.year
    let date = this.singleDate
    this.tasksheet.add(this.uid,{startedDate,description,month,year,projectType,date,projectName:projectName},'task')
    this.onCancel()
    this.toastr.sweetalert2('success','Added Succesfully')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();
  }

  change(event){
    const month=moment(event).format('MMM')

    const date=moment(event).format('DD-MM-YYYY')
    this.year=new Date(event).getFullYear()
    this.singleDate = new Date(event).getDate()

    this.date = `${date}`
    this.month = `${month}`
    
    
  }
 

  
}
