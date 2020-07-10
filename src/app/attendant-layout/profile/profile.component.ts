import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    img: 'http://i.pravatar.cc/500?img=7'
  }

  user1 = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    img: 'http://i.pravatar.cc/500?img=7'
  }

  user2 = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  }

  user4 = {
    email: '',
    password: '',
    newPassword: ''
  }


  signForm1 = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
  });


  searchElementRef: ElementRef;

  @ViewChild('search') set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.searchElementRef = content;
    }
  }

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.user.email = tokenService.getEmail();
    this.user.firstName = tokenService.getFirstName();
    this.user.lastName = tokenService.getLastName();

  }



  ngOnInit(): void {
    this.myform = this.fb.group({
      oldpassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl('', [Validators.required]),
    }, { validator: this.checkPasswords });
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }


  submit1() {

  }

  changepic() {

  }

  submit2() {

  }

  submit3() {

  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
