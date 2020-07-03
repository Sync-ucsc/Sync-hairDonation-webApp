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
      this.router.navigate(['/pagenotfound']);
    }
    return beforlogin;
  }
  constructor(private Token: TokenService, private router: Router) { }

}
