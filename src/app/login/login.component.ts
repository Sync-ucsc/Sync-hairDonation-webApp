import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  user = {
    email:'',
    password: ''
  }
  loginSub;
  user1 = {
    email: '',
    password: ''
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private Users: UserService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
   }

  onSubmit() {
    this.user1.email = this.user.email;
    this.user1.password = Md5.hashStr(this.user.password).toString();
    this.loginSub = this.Users.login(this.user1).subscribe(
      data => {

        if (data['success'] === true && data['msg'] === 'sign in'){

          this.handleResponse(data['data']);

        } else if (data['success'] === true && data['msg'] === 'password change') {
          this.Token.handle(data['data']['userToken']);
          Swal.fire(
            'Password change!',
            'you must password change!',
            'success'
          );
          this.router.navigate(['/activate']);

        } else if (data['success'] === true && data['msg'] === 'wait for attendant') {
          Swal.fire(
            'wait!',
            'wait for attendant!',
            'info'
          );
          this.router.navigate(['/patient-wait']);

        } else if (data['success'] === true && data['msg'] === 'email verification') {
          Swal.fire(
            'wait!',
            'Check your email!',
            'info'
          );
          this.router.navigate(['/donor-wait']);

        }  else if (data['success'] === false ) {
          Swal.fire(
            'Login Error!',
            data['msg']+'!',
            'error'
          );

        } else {
          Swal.fire(
            'Login Error!',
            'connection error!',
            'error'
          );
        }
        },
      error => {
        Swal.fire(
          'Login Error!',
          error.error.msg,
          'error'
        );
        this.handleError(error)
      }
    );
  }
  handleError(error){
    console.log(error)
  }

  handleResponse(data) {
    this.Token.handle(data.userToken);
    this.Auth.changeAuthStatus(true);
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
      this.router.navigate(['login']);
    }
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

  ngOnDestroy(){
    if (this.loginSub !== undefined) {
      this.loginSub.unsubscribe();
    }
  }



}
