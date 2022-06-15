import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  uid:any
  userEmail:any
  constructor(private route:ActivatedRoute,private employeeTaskSheetService:TasksheetService) { }

  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{ 
      this.uid = params['uid']
    })
    this.employeeTaskSheetService.data.doc(this.uid).valueChanges().subscribe(data=>{
      this.userEmail =  data.email
    })
  }
  
}
