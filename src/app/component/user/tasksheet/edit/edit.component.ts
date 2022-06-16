import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  addtaskForm:FormGroup
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
    private toastr:NotificationService) { }

  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      this.month = params['month']
      this.year = params['year']    
    })
      
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      data.forEach(ele=>{
        if(ele.uid === this.id){
          this.task = ele
          this.addtaskForm = new FormGroup({
            "projectType":new FormControl(this.task.projectType,Validators.required),
            'startedDate':new FormControl(this.task.startedDate,Validators.required),
            'description':new FormControl(this.task.description,Validators.required)
          })
        }
      })
    }) 
  }


  onSubmit(){    
    this.date = new Date(this.addtaskForm.value.startedDate).toLocaleDateString()
 
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.projectType
    this.tasksheet.updateTask(this.uid,this.id,{startedDate:this.date,date:this.singleDate,description:description,projectType:projectType,year:this.year,month:this.month})
    this.onCancel()
    this.toastr.sweetalert2("info" , 'updated Successfully')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();

  }
  singleDate:any
  change(event){
    const singleDate = new Date(event).getDate()
    this.singleDate = `${singleDate}`
  }
}
