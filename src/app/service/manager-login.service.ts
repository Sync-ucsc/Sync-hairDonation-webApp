import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isManager: boolean = (this.Token.isUserHospital());
    // if not, redirect to /pagenotfound
    if (!isManager) {
      this.router.navigate(['/']);
    }
    return isManager;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
