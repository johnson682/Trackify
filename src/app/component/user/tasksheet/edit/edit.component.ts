import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  ProjectType=['Testing','Angular','Documentation'];
  addtaskForm:FormGroup
  today = new Date()
  isOpen=false

  id:any
  uid:any
  date:any
  task:any
  month:any;
  year:any;
  singleDate:any;

  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private route:ActivatedRoute,
    private formBUilder:UntypedFormBuilder,
    private location:Location,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    document.getElementById('exampleModal').classList.add('animate__animated','animate__fadeIn')
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      this.month = params['month']
      this.year = params['year']    
    })

    this.addtaskForm = this.formBUilder.group({
      Name:[''],
      projectType:['',Validators.required],
      startedDate:['',Validators.required],
      description:['',Validators.required]
    })
      
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year},'task').subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.id){
          this.task = ele
          this.init(this.task)
        }
      })
    }) 
  }

  init(task){
    this.addtaskForm.patchValue({
      Name:task.ProjectName,
      projectType:task.ProjectType,
      startedDate:task.localDate,
      description:task.Description
    })
  }

  onSubmit(){    
    let ProjectName = this.addtaskForm.value.Name
    let Description = this.addtaskForm.value.description
    let ProjectType = this.addtaskForm.value.projectType
    this.tasksheet.updateTask(this.uid,this.id,{
      localDate:this.date,date:
      this.singleDate,
      Description:Description,
      ProjectType:ProjectType,
      year:this.year,
      day:this.day,
      month:this.month,
      ProjectName:ProjectName
    },'task')
    // this.router.navigate(['/user/user-main/tasksheet'])
    this.location.back()
    document.getElementById("closeModalButton").click();
    this.toastr.sweetalert2("info" , 'updated Successfully')
  }

  onCancel(){
    if(this.addtaskForm.dirty){
      Swal.fire({
        text:'Are you sure?',
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

  day:any
  change(event){
    const month=moment(event).format("MMM")
    const date=moment(event).format("DD-MM-YYYY")
    this.year=new Date(event).getFullYear()
    this.day = moment(event).format('dddd')
    this.singleDate =new Date(event).getDate()
    this.date = `${date}`
    this.month = `${month}`
  }

}
