import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';

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

  task:any
  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private authService:AuthService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    let data=JSON.parse(localStorage.getItem('user'))
    this.uid = data.uid

    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
    })
    
    this.tasksheet.getId().doc(this.uid).collection('task').snapshotChanges().pipe(
      map(a=>
        a.map(c=>        
          ({id:c.payload.doc.id,...c.payload.doc.data()})
        )
      )
    ).subscribe(data=>{
      data.forEach(ele=>{
        if(ele.id === this.id){
          this.task = ele
          console.log(ele);
          this.addtaskForm = new FormGroup({
            'date':new FormControl(this.task.date,Validators.required),
            'day':new FormControl(this.task.day,Validators.required),
            'description':new FormControl(this.task.description,Validators.required)
          })
        }
      })
    }) 
    

  }


  onSubmit(){
    let date = this.addtaskForm.value.date
    let day = this.addtaskForm.value.day
    let description = this.addtaskForm.value.description
    this.tasksheet.updateTask(this.uid,this.id,{date:date,day:day,description:description})
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
  }
}
