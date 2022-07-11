import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from './component/login/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private userIdle: UserIdleService,private authService:AuthService) {}

  ngOnInit(): void {
    console.log("hit");
    
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count=>{
      console.log(count);
    });
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.authService.logout("hit")
      this.userIdle.resetTimer()
    }
    );
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

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
