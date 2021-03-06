import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { SalonApiService } from '@services/salon-api.service';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
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
    email: '',
    phone: '',
    address: '',
    img: 'http://i.pravatar.cc/500?img=7',
    lat: 6.86,
    lon: 79.89
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

  user3 = {
    email: '',
    lat: 0,
    lon: 0
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

  test = false;
  zoom: Number;
  address: string;
  latitude = 0;
  longitude = 0;
  placeaddress;
  private geoCoder;
  getSalonByEmailSub;
  @BlockUI() blockUI: NgBlockUI;
  profileChangePasswordSub;
  getDownloadURLSub;
  snapshotChangesSub;
  changeLocationSub;
  image;
  name;
  selectedImage;
  url;
  id;


  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private salonService: SalonApiService,
    private service: CommonService
  ) {
    this.name = this.tokenService.getFirstName() + ' ' + this.tokenService.getLastName();
    this.image = this.tokenService.getImg();
    this.user.email = tokenService.getEmail();
    this.user.firstName = tokenService.getFirstName();
    this.user.phone = tokenService.getPhone();
    this.user.img = tokenService.getImg();
    this.getSalonByEmailSub = this.salonService.getSalonByEmail(this.user.email).subscribe(
      data => {
        this.user.address = data.data.address
        this.user.lat = data.lat
        this.user.lon = data.lon
        this.latitude = data.lat
        this.longitude = data.lon
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
    setTimeout(() => {
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        // tslint:disable-next-line: new-parens
        this.geoCoder = new google.maps.Geocoder;

        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            console.log(autocomplete)
            this.test = true;
            // set latitude, longitude and zoom
            this.user.lat = place.geometry.location.lat();
            this.user.lon = place.geometry.location.lng();
            this.zoom = 15;
          });
        });

        // this.getAddress(this.user.lat, this.user.lon);
      });
    }, 100)
    this.service.data$.subscribe(res => { this.image = res['image'], this.name = res['name'] })
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator && (this.user.lat === 0 && this.user.lon === 0)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user.lat = position.coords.latitude;
        this.user.lon = position.coords.longitude;
        // this.getAddress(this.user.lat, this.user.lon);
      });
    }
    this.zoom = 15;
  }



  markerDragEnd($event: any) {
    console.log($event);
    this.user.lat = $event.coords.lat;
    this.user.lon = $event.coords.lng;
    this.test = true;
    // this.getAddress(this.user.lat, this.user.lon);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  submit1() {
    this.userService.salonProfileChange(this.user).subscribe(
      data => {
        console.log(this.user)
        console.log(data)
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
    if (this.latitude !== this.user.lat || this.longitude !== this.user.lon) {
      this.user3.email = this.user.email;
      this.user3.lat = this.user.lat;
      this.user3.lon = this.user.lon;
      this.changeLocationSub = this.salonService.changeLocation(this.user3).subscribe(
        data => {
          Swal.fire(
            'Location change!',
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
  }

  ngOnDestroy(){
    if (this.getSalonByEmailSub !== undefined) {
      this.getSalonByEmailSub.unsubscribe();
    }
    if (this.profileChangePasswordSub !== undefined) {
      this.profileChangePasswordSub.unsubscribe();
    }
    if (this.changeLocationSub !== undefined) {
      this.changeLocationSub.unsubscribe();
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
