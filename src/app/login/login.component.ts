import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email:'',
    password: ''
  }

    constructor(
    private Users: UserService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
   }

  onSubmit() {
    this.Users.login(this.user).subscribe(
      data => {
        this.handleResponse(data['data'])
        },
      error => {
        this.handleError(error)
      }
    );
  }
  handleError(error){
    console.log(error)
  }

  handleResponse(data) {
    console.log(data)
    this.Token.handle(data.userToken);
    this.Auth.changeAuthStatus(true);
    this.Users.getprofile().subscribe(
      data => {
        console.log(data['data'])
      },
      error => {
        console.log(error)
      }
    );
    // if (this.Token.isUserAdmin()) {
    //   this.router.navigateByUrl('admin/Dashboard');
    // } else if (this.Token.isUserdemo()) {
    //   this.router.navigateByUrl('demo/Dashboard');
    // } else if (this.Token.isUserLecture()) {
    //   this.router.navigateByUrl('lecturer/Dashboard');
    // } else {
    //   this.router.navigateByUrl('login');
    // }
  }

  ngOnInit(): void {
  }

  ismobile(){
    if(window.innerWidth<764){
      return true;
    } else {
      return false;
    }
  }

  

}
