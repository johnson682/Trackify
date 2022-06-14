import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AdminProfileService } from '../admin/service/admin-profile.service';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  uid:any
  users:any;
  user:any
  
    navbar = document.getElementById('navbar')
    brand = document.getElementById('brand')
    constructor(private userService:UserService ,public authService:AuthService,private adminProfileService:AdminProfileService) { }
  
    ngOnInit() {
      const userData = JSON.parse(localStorage.getItem('user'))
      this.uid = userData.uid
      window.addEventListener('scroll', this.scroll, true); //third parameter
  
      if(this.uid === 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'){
        this.adminProfileService.adminRef.valueChanges().subscribe(data=>{
          this.users = data
          const datas=this.users.filter(obj=>obj.uid === this.uid)
          this.user = data[0] 
        })
      }else{
        this.userService.userRef.valueChanges().subscribe(data=>{
          this.users=data
          const datas=this.users.filter(obj=>obj.uid === this.uid)
          this.user = datas[0]
        })
  
      }
  
    } 
  
    scroll(){
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
        if(this.navbar !=null && this.brand != null){
          this.navbar.style.padding = "5px 5px"
          this.brand.style.fontSize = "24px"
        }
      }else {
        if(this.navbar !=null && this.brand != null){
          this.navbar.style.padding = "10px 10px";
          this.brand.style.fontSize = "30px";
        }
      }
    };
  
    logout(){
      this.authService.logout(this.uid)
    }
    ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
    }

}
