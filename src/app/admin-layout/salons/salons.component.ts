import { OnDestroy } from '@angular/core';
/// <reference types="@types/googlemaps" />
import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { SalonApiService } from './../../service/salon-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { MatAutocompleteModule } from '@angular/material/autocomplete'; 

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.scss']
})


export class SalonsComponent implements OnInit,OnDestroy {

  socket = io('http://127.0.0.1:3000/salon');

  submitted=false;
  latitude: number;
  longitude: number;
  zoom: number; 
  address: string;
  placeaddress;
  private geoCoder;
  checkSystem=false;
  checkSms=false;
  checkEmail=false;

  districts: any = ['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Polonnaruwa', 'Kandy'];

  salonForm= new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    checkSystem: new FormControl(''),
    checkSms: new FormControl(''),
    checkEmail: new FormControl(''),
    address:new FormControl(''),
    latitude:new FormControl(''),
    longitude:new FormControl(''),
    district: new FormControl('', Validators.required),

  })


  @ViewChild('search')
  public searchElementRef: ElementRef;
  createSalonSub


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private apiService: SalonApiService
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {

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

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.placeaddress=place;
          this.zoom = 12;
        });
      });
    });
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
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}


 onSubmit(){



   if (!this.salonForm.valid) {
    return false;
    } else {

     console.log(`valid`)
     console.log(this.placeaddress.formatted_address);
     this.salonForm.patchValue({
       address:this.placeaddress.formatted_address,
       latitude:this.latitude,
       longitude:this.longitude
     })
     console.log(this.salonForm.value);
     this.submitted=true;
     this.createSalonSub = this.apiService.createSalon(this.salonForm.value).subscribe(
      data => {
          console.log('Salon successfully created!'+data)
          Swal.fire(
            'Done!',
            'You added a new salon!',
            'success'
          )
          this.router.navigateByUrl('/admin/manage-salons');
      },
      error => {
        // Do something with error
        console.error(error);
        Swal.fire(
          'error!',
          'add salon failed!',
          'error'
        )
      }
    );
  }
 }

 ngOnDestroy(){
   if (this.createSalonSub !== undefined) {
     this.createSalonSub.unsubscribe();
   }
 }

}
