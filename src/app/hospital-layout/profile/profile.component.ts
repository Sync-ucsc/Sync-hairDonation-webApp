
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerApiService } from '@services/manager-api.service';
import { Md5 } from 'ts-md5';
import Swal from 'sweetalert2';
import { CommonService } from '@services/common.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    img: 'http://i.pravatar.cc/500?img=7'
  }

  @BlockUI() blockUI: NgBlockUI;
  profileChangePasswordSub;
  getDownloadURLSub;
  snapshotChangesSub;

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
    oldPassword: ''
  }

  user5 = {
    email: '',
    password: '',
    oldPassword: ''
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
  selectedImage;
  url;
  id;
  name;
  image;

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();


  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private managerServic: ManagerApiService,
    private service: CommonService
  ) {
    this.user.email = tokenService.getEmail();
    this.user.firstName = tokenService.getFirstName();
    this.user.lastName = tokenService.getLastName();
    this.user.phone = tokenService.getPhone();
    this.user.img = tokenService.getImg();
    this.managerServic.getManagerByEmail(this.user.email).subscribe(
      data => {
        console.log(data)
        this.user.address = data.data.address
      },
      error => {

      })

  }



  ngOnInit(): void {
    this.myform = this.fb.group({
      oldpassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl('', [Validators.required]),
    }, { validator: this.checkPasswords });
    this.service.data$.subscribe(res => { this.image = res['image'], this.name = res['name'] })
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }


  submit1() {
    this.userService.mangerProfileChange(this.user).subscribe(
      data => {
        this.tokenService.handle(data['data'].userToken);
        this.name = this.tokenService.getFirstName() + ' ' + this.tokenService.getLastName();
        this.image = this.tokenService.getImg();
        this.service.changeData({ image: this.image, name: this.name })
        Swal.fire(
          'Profile change!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )
  }

  changepic(event: any) {
    this.selectedImage = event.target.files[0];
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.blockUI.start();
    this.snapshotChangesSub = this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.getDownloadURLSub = fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.user.img = url;
          this.blockUI.stop();
          Swal.fire(
            'Success',
            'Upload Successful',
            'success'
          )
        })
      })
    ).subscribe();
  }

  submit2() {
    this.user5.email = this.user.email;
    this.user5.password = Md5.hashStr(this.user4.password).toString();
    this.user5.oldPassword = Md5.hashStr(this.user4.oldPassword).toString();
    this.profileChangePasswordSub = this.userService.profileChangePassword(this.user5).subscribe(
      data => {
        Swal.fire(
          'Password change!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )
  }

  submit3() {

  }

  ngOnDestroy() {

    if (this.profileChangePasswordSub !== undefined) {
      this.profileChangePasswordSub.unsubscribe();
    }
    if (this.snapshotChangesSub !== undefined) {
      this.snapshotChangesSub.unsubscribe();
    }
    if (this.getDownloadURLSub !== undefined) {
      this.getDownloadURLSub.unsubscribe();
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
