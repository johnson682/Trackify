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
    private toastr:NotificationService,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      console.log(this.id);
      this.month = params['month']
      this.year = params['year']
      console.log(this.year);
      
      
    })
      
    this.tasksheet.getAllTask(this.uid,{month:this.month,year:this.year}).subscribe(data=>{
      console.log(data);
      
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
    this.toastr.showInfo("Successfully updated" , 'Well Done!!')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
    document.getElementById("closeModalButton").click();
    this.spinnerService.hide()

  }
  singleDate:any
  change(event){
    // console.log(event);
    // const month=new Date(event).getMonth()
    
    // const date=new Date(event).toLocaleDateString()
    // const givenmonth=this.tasksheet.getMonths(month)
    // const year=new Date(event).getFullYear()
    const singleDate = new Date(event).getDate()
    this.singleDate = `${singleDate}`

    // this.date = `${date}`
    // console.log(this.date);
    
    // this.month = `${givenmonth}`
    // console.log(this.month);
    
    // this.year=`${year}`
    
    
  }
}
