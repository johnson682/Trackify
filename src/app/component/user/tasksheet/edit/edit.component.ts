import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  addtaskForm:FormGroup
  id:any
  uid:any
  update=false
  date:any

  isOpen=false
  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  task:any
  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private route:ActivatedRoute,
    private toastr:NotificationService,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
    })
    
    this.tasksheet.getAllTask().doc(this.uid).collection('task').snapshotChanges().pipe(
      map(a=>a.map(c=>
          ({uid:c.payload.doc.id,...c.payload.doc.data()})    
      ))
    ).subscribe(data=>{
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
    this.tasksheet.updateTask(this.uid,this.id,{startedDate:this.date,description:description,projectType:projectType})
    this.onCancel()
    this.toastr.showInfo("Successfully updated" , 'Well Done!!')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()

  }
}
