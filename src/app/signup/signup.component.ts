/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
declare function getFingerprint(): any;
import PlaceResult = google.maps.places.PlaceResult;
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from '@services/user.service';
import { FingerprintService } from '@services/fingerprint.service';
import { IpService } from '@services/ip.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    fname:'',
    lname:'',
    email:'',
    nic:'',
    phone: '',
    address: '',
    lat: 0,
    lon: 0,
    address1: '',
    password:'',
    role:'donor',
    fingerprint:0,
    fpcount:0
  }

  user1 = {
    fname:'',
    lname:'',
    email:'',
    nic:'',
    phone: '',
    address: '',
    lat: 0,
    lon: 0,
    password:'',
    role:'donor',
    fingerprint:0,
    fpcount:0,
    city: 'pannipitiya',
    region: 'Western Province',
    country: 'Lk',
  }

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();

  test = false;
  latitude = 0;
  longitude = 0;
  zoom: number;
  address: string;
  placeaddress;
  private geoCoder;

  btn1 =false;
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
    address1: new FormControl('', [Validators.required]),
  });

  signForm4 = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });





  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ipservice: IpService,
    private fb: FormBuilder,
    private router:Router,
    private userService: UserService,
    private fingerprint: FingerprintService
  ) {
    this.user.fingerprint = getFingerprint()
    this.fingerprint.checkfp(getFingerprint()).subscribe(
      data => {
        console.log(data)
        if(data.success === true){
          if(data.data !== ''){
            console.log(data.data);
            if(data.data.block === true && data.data.check === false){
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
    this.ipservice.getIPAddress().subscribe((data) => {
      console.log(data);
    });
  }



  ngOnInit() {
    this.myform = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(''),
    }, { validator: this.checkPasswords });
    
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator && (this.latitude === 0 && this.longitude === 0)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }



  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.test = true;
    this.getAddress(this.latitude, this.longitude);
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


  changeForm(x){
    const elm1 = document.getElementsByClassName('btn1')
    if(x === 'form1'){
      this.form1 = true;
      this.form2 = false;

      this.btn1 = false;
      this.btn2 = false;
      this.btn3 = false;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = false;
    } else if( x === 'form2'){
      if(this.signForm1.valid){
        if (this.test){
          this.user.address1 = this.user.address;
        }
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
    } else if ( x === 'form3'){
      if (this.signForm2.valid) {
        console.log(this.user)
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
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 15;
              });
            });
          });
        }, 100)
      }

    } else if ( x === 'form4'){
      this.user.lat = this.latitude;
      this.user.lon = this.longitude;
      this.user.address1 = this.user.address;
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

  onSubmit(){
    this.user1.password = Md5.hashStr(this.user.password).toString();
    this.user1.fname = this.user.fname;
    this.user1.lname =this.user.lname;
    this.user1.email =this.user.email;
    this.user1.nic =this.user.nic;
    this.user1.phone = this.user.phone;
    this.user1.address = this.user.address;
    this.user1.lat= this.user.lat;
    this.user1.lon = this.user.lon;
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
