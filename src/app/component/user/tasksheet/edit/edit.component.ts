import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  addtaskForm:UntypedFormGroup
  id:any
  uid:any
  update=false
  date:any
  datas:any
  today = new Date()
  isOpen=false
  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  task:any
  month:any;
  year:any;
  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private route:ActivatedRoute,
    private formBUilder:UntypedFormBuilder,
    private toastr:NotificationService) { }

  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      this.month = params['month']
      this.year = params['year']    
    })

    this.addtaskForm = this.formBUilder.group({
      Name:['',Validators.required],
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
      Name:task.projectName,
      projectType:task.projectType,
      startedDate:task.startedDate,
      description:task.description
    })
  }


  onSubmit(){    
    let projectName = this.addtaskForm.value.Name
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.projectType
    this.tasksheet.updateTask(this.uid,this.id,{
      startedDate:this.date,date:
      this.singleDate,
      description:description,
      projectType:projectType,
      year:this.year,
      month:this.month,
      projectName:projectName
    },'task')
    this.onCancel()
    this.toastr.sweetalert2("info" , 'updated Successfully')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();

  }
  singleDate:any
  change(event){
    const month=moment(event).format("MMM")

    const date=moment(event).format("DD-MM-YYYY")
    this.year=new Date(event).getFullYear()
    this.singleDate =new Date(event).getDate()

    this.date = `${date}`
    this.month = `${month}`

  }
}
