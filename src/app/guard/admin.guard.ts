import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../component/login/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const uid = next.data['uid']
        const userData = JSON.parse(localStorage.getItem('user'))
    if(this.authService.isLoggedIn !== true || uid !== userData.uid) {
      this.router.navigate(['login'])
    }
    return true;
  }
}