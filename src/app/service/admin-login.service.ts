import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin: boolean = (this.Token.isUserAdmin());
    // if not, redirect to /pagenotfound
    if (!isAdmin) {
      this.router.navigate(['/']);
    }
    return isAdmin;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
