import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class BeforLoginService {


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const beforlogin: boolean = !this.Token.loggedIn();
    // if not, redirect to /pagenotfound
    if (!beforlogin) {
      if (this.Token.isUserAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.Token.isUserAttendant()) {
        this.router.navigate(['/attendant/dashboard']);
      } else if (this.Token.isUserDonor()) {
        this.router.navigate(['/donor/dashboard']);
      } else if (this.Token.isUserHospital()) {
        this.router.navigate(['/hospital/dashboard']);
      } else if (this.Token.isUserPatient()) {
        this.router.navigate(['/patient/dashboard']);
      } else if (this.Token.isUserSalon()) {
        this.router.navigate(['/salon/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }
    return beforlogin;
  }
  constructor(private Token: TokenService, private router: Router) { }

}
