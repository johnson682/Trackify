import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { NotificationService } from 'src/app/service/notification.service';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../../login/service/auth.service';
@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {
  uid:any
  user:any

  imageFile:any
  users:any;
  loading= false
  constructor(
    private userService:UserService ,
    public authService:AuthService,
    private tasksheetService:TasksheetService,
    private notificationService:NotificationService,
    public translate:TranslateService
   ) { 
    translate.addLangs(['en', 'ta' , 'fr'])
    translate.setDefaultLang('en')
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ en | ta | fr /) ? browserLang : 'en')
   }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.uid = userData.uid
    this.userService.getData(this.uid).subscribe(data=>{
      this.user = data
    })
  } 

  localTimeEnd:any;
  stopTime:any;

  logout(){
    this.userService.userRef.doc(this.uid).get().subscribe(data=>{
      const datas = data.data()
      if(datas.StopStatus){
        this.notificationService.sweetalert2Modal(
          'Are you sure want to Logout?',
          'You will not be able to recover this LoginTime!',
          'warning',
          true,
          'Yes, Logout !',
          'No, keep Login'
        ).then((result) => {
          if (result.value) {
            this.loading = true;
            this.userService.userRef.doc(this.uid).update({ Status: false ,logoutTime:moment().format('MMM DD')});
            this.authService.logout().then(()=>{
              this.loading = false
            })
            this.userService.updateUserData(this.uid,{StopStatus:false})
            this.userService.userRef.doc(this.uid).get().subscribe(data=>{
              const datas= data.data()
              this.localTimeEnd = moment().format('hh:mm a')
              this.stopTime = new Date().getTime()
              const  totalTime = this.stopTime - datas.startTime
              const time = this.tasksheetService.convertMsToHM(totalTime) 
              
              this.tasksheetService.add(this.uid,{
                startTimeInMS:datas.startTime,
                stopTimeInMs:this.stopTime,
                startTime:datas.localTimeStart,
                endTime:this.localTimeEnd,
                month:moment().format('MMM'),
                year:new Date().getFullYear(),
                date:new Date().getDate(),
                totalHours:time,
                totalTime:totalTime,
                localDate:moment().format('DD-MM-YYYY')
              },'ActivityLog')
      
            })
            
          } 
       })
      }else{
        this.loading = true;
        this.userService.userRef.doc(this.uid).update({ Status: false ,logoutTime:moment().format('MMM DD')});
        this.authService.logout().then(()=>{
          this.loading = false
        })
      }
    })
  }

  
}
