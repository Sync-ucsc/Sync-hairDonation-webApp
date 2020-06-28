import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare function getFingerprint(): any;
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from '@services/user.service';
import { FingerprintService } from '@services/fingerprint.service';
@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component implements OnInit {

  user = {
    fname: '',
    lname: '',
    email: '',
    nic: '',
    phone: '',
    address: '',
    password: '',
    role: 'patient',
    fingerprint: 0,
    fpcount: 0
  }

  user1 = {
    fname: '',
    lname: '',
    email: '',
    nic: '',
    phone: '',
    address: '',
    password: '',
    role: 'patient',
    fingerprint: 0,
    fpcount: 0
  }

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();

  btn1 = false;
  btn2 = false;
  btn3 = false;
  btn4 = false;
  btncu2 = false;
  btncu3 = false;
  btncu4 = false;



  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;
  searchElementRef: ElementRef;
  @ViewChild('search') set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.searchElementRef = content;
    }
  }


  signForm1 = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  signForm2 = new FormGroup({
    nic: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
  });
  signForm3 = new FormGroup({
    
  });

  signForm4 = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });





  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private fingerprint: FingerprintService
  ) {
    this.user.fingerprint = getFingerprint()
    this.fingerprint.checkfp(getFingerprint()).subscribe(
      data => {
        console.log(data)
        if (data.success === true) {
          if (data.data !== '') {
            console.log(data.data);
            if (data.data.block === true && data.data.check === false) {
              this.router.navigate(['/']);
              Swal.fire(
                'Error!',
                'you can creat only limited account!',
                'error'
              )

            } else if (data.data.block === true && data.data.check === true) {
              this.user.fpcount = 1
              Swal.fire(
                'warning!',
                'you have alrady account!',
                'warning'
              )
            } else {
              this.user.fpcount = 1
              Swal.fire(
                'warning!',
                'you have alrady one account!',
                'warning'
              )
            }
          }
        } else {
          this.router.navigate(['/']);
          Swal.fire(
            'error!',
            'connection error!',
            'error'
          )
        }
      },
      error => {
        // Do something with error
        this.router.navigate(['/'])
        console.error(error);
        Swal.fire(
          'error!',
          'connection error!',
          'error'
        )
      }
    )
  }



  ngOnInit() {
    this.myform = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(''),
    }, { validator: this.checkPasswords });
  }



  ismobile() {
    if (window.innerWidth < 764) {
      return true;
    } else {
      return false;
    }
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }


  changeForm(x) {
    const elm1 = document.getElementsByClassName('btn1')
    if (x === 'form1') {
      this.form1 = true;
      this.form2 = false;

      this.btn1 = false;
      this.btn2 = false;
      this.btn3 = false;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = false;
    } else if (x === 'form2') {
      if (this.signForm1.valid) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;

        this.btn1 = true;
        this.btn2 = false;
        this.btn3 = false;
        this.btn4 = false;
        this.btncu2 = true;
        this.btncu3 = false;
        this.btncu4 = false;
      }
    } else if (x === 'form3') {
      if (this.signForm2.valid) {
        this.form2 = false;
        this.form3 = true;
        this.form4 = false;

        this.btn1 = true;
        this.btn2 = true;
        this.btn3 = false;
        this.btn4 = false;
        this.btncu2 = false;
        this.btncu3 = true;
        this.btncu4 = false;
      }

    } else if (x === 'form4') {
      this.form3 = false;
      this.form4 = true;

      this.btn1 = true;
      this.btn2 = true;
      this.btn3 = true;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = true;
    }
  }

  onSubmit() {
    this.user1.password = Md5.hashStr(this.user.password).toString();
    this.user1.fname = this.user.fname;
    this.user1.lname = this.user.lname;
    this.user1.email = this.user.email;
    this.user1.nic = this.user.nic;
    this.user1.phone = this.user.phone;
    this.user1.address = this.user.address;
    this.user1.fingerprint = this.user.fingerprint;
    this.user1.fpcount = this.user.fpcount;
    this.userService.adduser(this.user1).subscribe(
      data => {
        console.log(data)
        Swal.fire(
          'Done!',
          'Your Signup Successfuly!',
          'success'
        )
        Swal.fire(
          'Done!',
          'Your Signup Successfuly!',
          'success'
        )
        Swal.fire(
          'Done!',
          'Your Signup Successfuly!',
          'success'
        )

        this.router.navigate(['/admin/manage-salons']);
      },
      error => {
        // Do something with error
        this.router.navigate(['/'])
        console.error(error);
        Swal.fire(
          'error!',
          'connection error!',
          'error'
        )
      });
  }

}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
