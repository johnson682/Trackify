import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  // standalone:true,
  // imports:[ReactiveFormsModule,CommonModule, BsDatepickerModule,NgSelectModule],
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  year:any;month:any;projectName:any;date:any;singleDate:any;
  addtaskForm:FormGroup
  isOpen = false;
  today:any
  uid:any
  upstartedDate=false

  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    document.getElementById('exampleModal1').classList.add('animate__animated','animate__fadeIn')
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
    let Date = this.date
    let Description = this.addtaskForm.value.description
    let ProjectType = this.addtaskForm.value.projectType
    let ProjectName = this.addtaskForm.value.Name
    let month =this.month
    let year = this.year
    let singledate = this.singleDate
    this.tasksheet.add(this.uid,{Date,Description,month,year,ProjectType,singledate,ProjectName},'task')
    this.onCancel()
    this.toastr.sweetalert2('success','Added Succesfully')
  }

  onCancel(){
    document.getElementById('exampleModal1').classList.add('animate__animated','animate__fadeOut')
    this.router.navigate(['/user/user-main/tasksheet'])
    document.getElementById("closeModalButton").click();
  }

  change(event){
    const month=moment(event).format('MMM')
    const date=moment(event).format('DD-MM-YYYY')
    this.year=new Date(event).getFullYear()
    this.singleDate = new Date(event).getDate()
    this.date = date
    this.month = `${month}`
  }
 
}
