import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private loadingspinner:NgxSpinnerService,private router:Router){
    this.router.events.subscribe(e=>this.navigation(e))
  }
  
  navigation(event:any){
    
    if(event instanceof NavigationStart){
      this.loadingspinner.show()
    }
    setTimeout(()=>{
      if(event instanceof NavigationEnd){
        this.loadingspinner.hide()
      }
      if(event instanceof NavigationCancel){
        this.loadingspinner.hide()
      }
      if(event instanceof NavigationError){
        this.loadingspinner.hide()
      }
    },500)
  }
  
}
