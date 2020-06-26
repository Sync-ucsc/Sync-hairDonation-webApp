/// <reference types="@types/googlemaps" />
import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
declare function getFingerprint(): any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    fname:'',
    lname:'',
    phone:'',
    email:'',
    lat: '',
    address:'',
  }

  latitude =5;
  longitude = 5;
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
  @ViewChild('search',{static:false}) public searchElementRef: ElementRef;


  signForm1 = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.maxLength(10), Validators.minLength(8)]),
  });

  signForm2 = new FormGroup({
    address: new FormControl('', [Validators.required]),
  });





  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }



  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
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
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
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

    } else if ( x === 'form4'){
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

}
