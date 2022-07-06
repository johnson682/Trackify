import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    // window.onbeforeunload = function (event) {
    // var message = 'Important: Please click on \'Save\' button to leave this page.';
    // if (typeof event == 'undefined') {
    //   event = window.event;
    // }
    // if (event) {
    //   event.returnValue = message;
    // }
    // return message;
    // };
  }  
}
