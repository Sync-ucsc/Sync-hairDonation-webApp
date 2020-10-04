import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PatientLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isPatient: boolean = (this.Token.isUserPatient());
    // if not, redirect to /pagenotfound
    if (!isPatient) {
      this.router.navigate(['/']);
    }
    return isPatient;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
