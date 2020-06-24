
import { AttendantApiService } from '../../service/attendant-api.service';
/// <reference types="@types/googlemaps" />
import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})


export class AttendantsComponent implements OnInit {

  socket = io('http://localhost:3000/attendants');

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

  attendantForm= new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
  })
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private apiService: AttendantApiService
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
  console.log(this.placeaddress.formatted_address);
  this.attendantForm.patchValue({
    address:this.placeaddress.formatted_address,
    latitude:this.latitude,
    longitude:this.longitude
  })
   console.log(this.attendantForm.value);
   this.submitted=true;

   if (!this.attendantForm.valid) {
    return false;
  } else {

    this.apiService.createAttendant(this.attendantForm.value).subscribe(
      (res) => {
        this.socket.emit('updatedata', res);
        console.log(' successfully added!')
        Swal.fire(
          'Done!',
          'You added a new attendant!',
          'success'
        )
        this.ngZone.run(() => this.router.navigateByUrl('/admin/manage-attendants'))
      }, (error) => {
        console.log(error);
      });
  }
 }

}
