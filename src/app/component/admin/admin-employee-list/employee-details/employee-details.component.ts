import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  uid:any
  user:any
  constructor(private route:ActivatedRoute,private userService:UserService) { }

  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{ 
      this.uid = params['uid']
      console.log(this.uid);
      
    })
    
  }
  
}
