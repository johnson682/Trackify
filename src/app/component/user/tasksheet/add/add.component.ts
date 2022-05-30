import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addtaskForm:FormGroup
  id:any
  uid:any
  update=false

  year:any;
  month:any;
  projectName:any
  day:any

  projectType=['Ui','NodeJs','Backend','Testing','Angular','react'];
  constructor(
    private router:Router,
    private tasksheet:TasksheetService,
    private toastr:NotificationService) { }

  ngOnInit(): void {

    let data=JSON.parse(localStorage.getItem('user'))
    console.log(data);
    this.uid = data.uid
    
    this.update =false
    let date=new Date().toLocaleDateString();

    this.year = new Date().getFullYear()
    
    this.getMonth()
    
    this.getDay()

    
    this.addtaskForm = new FormGroup({
      'date':new FormControl(date,Validators.required),
      'day':new FormControl(this.day,Validators.required),
      'description':new FormControl('',Validators.required),
      "project":new FormControl(this.projectName,Validators.required)
    })
  }

  onSubmit(){
    let date = this.addtaskForm.value.date
    let day = this.addtaskForm.value.day
    let description = this.addtaskForm.value.description
    let projectType = this.addtaskForm.value.project
    let month =this.month
    let year = this.year
    this.tasksheet.add(this.uid,{date,day,description,month,year,projectType})
    this.onCancel()
    this.toastr.showSuccess('Successfully Added','Well Done!!!')
  }

  onCancel(){
    this.router.navigate(['/user/tasksheet'])
  }

  getDay(){

    switch (new Date().getDay()) {
      case 0:
        this.day = "Sunday";
        break;
      case 1:
        this.day = "Monday";
        break;
      case 2:
        this.day = "Tuesday";
        break;
      case 3:
        this.day = "Wednesday";
        break;
      case 4:
        this.day = "Thursday";
        break;
      case 5:
        this.day = "Friday";
        break;
      case 6:
        this.day = "Saturday";
    }
  }

  getMonth(){
    switch(new Date().getMonth()){
      case 0:
        this.month = "Jan";
        break;
      case 1:
        this.month = "Feb";
        break;
      case 2:
        this.month = "Mar";
        break;
      case 3:
        this.month = "Apr";
        break;
      case 4:
        this.month = "May";
        break;
      case 5:
        this.month = "Jun";
        break;
      case 6:
        this.month = "Jul";
        break;
      case 7:
        this.month = "Aug";
        break;
      case 8:
        this.month = "Sep";
        break;
      case 9:
        this.month = "Oct";
        break;
      case 10:
        this.month = "Nov";
        break;
      case 11:
        this.month = "Dec";
    }
    
  }

}
