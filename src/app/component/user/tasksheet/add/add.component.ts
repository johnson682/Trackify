import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import Swal from 'sweetalert2';

@Component({
  // standalone:true,
  // imports:[ReactiveFormsModule,CommonModule, BsDatepickerModule,NgSelectModule],
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  projectType=['Documentation','Testing','Angular'];
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
    this.date = moment().format('DD-MM-YYYY')
    this.today = new Date()
    this.addtaskForm = new FormGroup({
      'Name':new FormControl(''),
      'startedDate':new FormControl(this.date,Validators.required),
      'description':new FormControl('',Validators.required),
      "projectType":new FormControl(this.projectName,Validators.required)
    })
  }

  onSubmit(){
    let localDate = this.date
    let Description = this.addtaskForm.value.description
    let ProjectType = this.addtaskForm.value.projectType
    let ProjectName = this.addtaskForm.value.Name
    let month =this.month
    let day = this.day
    let year = this.year
    let singledate = this.singleDate
    this.tasksheet.add(this.uid,{localDate,Description,month,year,ProjectType,singledate,ProjectName,day},'task')
    this.router.navigate(['/user/user-main/tasksheet'])
    document.getElementById("closeModalButton").click();
    this.toastr.sweetalert2('success','Added Succesfully')
  }

  onCancel(){

    if(this.addtaskForm.dirty){
      Swal.fire({
        title:'Are you sure?',
        text:'Remove Your Changes',
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonText:'Yes',
        cancelButtonText:'No',
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      }).then(result=>{
        if(result.value){
          this.router.navigate(['/user/user-main/tasksheet'])
          document.getElementById("closeModalButton").click();
        }
      })
    }else{
      this.router.navigate(['/user/user-main/tasksheet'])
      document.getElementById("closeModalButton").click();
    }
  }

  day:any;

  change(event){
    const month=moment(event).format('MMM')
    const date=moment(event).format('DD-MM-YYYY')
    this.year=new Date(event).getFullYear()
    this.day = moment(event).format('dddd')
    this.singleDate = new Date(event).getDate()
    this.date = date
    this.month = `${month}`
  }
 
}
