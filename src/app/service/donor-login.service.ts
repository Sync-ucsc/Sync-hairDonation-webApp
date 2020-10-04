import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DonorLoginService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isDonor: boolean = (this.Token.isUserDonor());
    // if not, redirect to /pagenotfound
    if (!isDonor) {
      this.router.navigate(['/']);
    }
    return isDonor;
  }
  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
}
