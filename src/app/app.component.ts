import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from './component/login/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private userIdle: UserIdleService,private authService:AuthService,private router:Router) {
  }

  ngOnInit(): void {
    // this.userIdle.startWatching();
    
    // // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count=>{
    //   console.log(count);
      
    // });
    
    
    // // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => {
    //   this.authService.logout()
    //   this.userIdle.stopTimer()
    // });

    if(this.authService.isLoggedIn){
      this.authService.autoLogin()
    }
  }  
}
