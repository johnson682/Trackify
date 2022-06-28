import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-timetracker',
  template: `
    <div class="container-fluid" style="margin-top: 10px;">
      <router-outlet></router-outlet>
    </div>
  `,
})

export class TimetrackerComponent implements OnInit {

 ngOnInit(){

 }
}
