import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss']
})
export class RegisterPasswordComponent implements OnInit ,OnDestroy{

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });

  user = {
    password:'',
    token:'',
    email:''
  }
  logindata = {
    email:'',
    password:''
  }
  changePasswordSub;
  loginSub;
  activatedrouteSub;

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService, private fb: FormBuilder, private activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(''),
    }, { validator: this.checkPasswords });
    this.activatedrouteSub = this.activatedroute.queryParamMap.subscribe(params => {
      this.logindata.email = params.get('email');
      this.logindata.password = params.get('token');
    });
    this.loginSub = this.userService.login(this.logindata).subscribe(
      data => {
        if (data['msg'] === 'password change'){
          console.log(data)
          this.user.token = data['data']['userToken'].split('JWT')[1];
          this.user.email = data['data']['user']['email'];
          Swal.fire(
            'Password change!',
            'you must password change!',
            'success'
          );
        } else {
          Swal.fire(
            'Invalid!',
            'token invalid!',
            'error'
          );
           this.router.navigate(['/login']);
        }
      },
      error => {
        Swal.fire(
          'Invalid!',
          'token invalid!',
          'error'
        );
        this.router.navigate(['/login']);
      }
    )
  }

  onSubmit(){
    let udata = {
      email: this.user.email,
      password: Md5.hashStr(this.user.password).toString()
    }
    this.changePasswordSub = this.userService.changePassword(udata,this.user.token).subscribe(
      data => {
        console.log(data)
        if (data['success'] === true){
          Swal.fire(
            'Password change!',
            'your password changed!',
            'success'
          );
          this.router.navigate(['/login']);
        }else {
          Swal.fire(
            'Invalid!',
            'Try again!',
            'error'
          );
        }
      },
      error => {
        Swal.fire(
          'Invalid!',
          'Try again!',
          'error'
        );
      }
    )
    console.log(this.user)
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnDestroy() {

    if (this.changePasswordSub !== undefined) {
      this.changePasswordSub.unsubscribe();
    }
    if (this.loginSub !== undefined) {
      this.loginSub.unsubscribe();
    }
    if (this.activatedrouteSub !== undefined) {
      this.activatedrouteSub.unsubscribe();
    }
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
