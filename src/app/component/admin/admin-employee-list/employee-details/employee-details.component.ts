import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  uid:any
  user:any
  constructor(private route:ActivatedRoute) { }

  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{ 
      this.uid = params['uid']
    })
    
  }
  
}
