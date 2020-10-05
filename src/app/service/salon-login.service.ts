import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SalonLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isSalon: boolean = (this.Token.isUserSalon());
    // if not, redirect to /pagenotfound
    if (!isSalon) {
      this.router.navigate(['/']);
    }
    return isSalon;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
