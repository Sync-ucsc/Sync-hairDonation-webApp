import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AttendantLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAttenndant: boolean = (this.Token.isUserAttendant());
    // if not, redirect to /pagenotfound
    if (!isAttenndant) {
      this.router.navigate(['/']);
    }
    return isAttenndant;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
