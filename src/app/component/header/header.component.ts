import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { empty } from 'rxjs';
import { AuthService } from 'src/app/component/login/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  navbar = document.getElementById('navbar')
  brand = document.getElementById('brand')
  constructor(private route:ActivatedRoute,private router:Router ,public authService:AuthService) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter

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

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
