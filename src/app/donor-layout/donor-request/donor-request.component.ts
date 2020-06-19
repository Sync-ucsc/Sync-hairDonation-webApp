import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import * as io from 'socket.io-client';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { SalonApiService } from './../../service/salon-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-donor-request',
  templateUrl: './donor-request.component.html',
  styleUrls: ['./donor-request.component.scss']
})
export class DonorRequestComponent implements OnInit {
   
  socket = io('http://localhost:3000/salon');

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
  yes=false;
  no=false;

  salonForm 

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private apiService: SalonApiService
  ) { }

  ngOnInit(): void {

    this.salonForm = new FormGroup({
      address:new FormControl(''),
      latitude:new FormControl(''),
      longitude:new FormControl(''),
      yes:new FormControl(false),
      no:new  FormControl(false),
  
    })


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

onChange1(eve: any) {
  this.yes = !this.yes;
}

onChange2(eve: any) {
  this.no = !this.no;
  console.log(this.no)
}

 onSubmit(){

   console.log(this.placeaddress.formatted_address);
   this.salonForm.patchValue({
     address:this.placeaddress.formatted_address,
     latitude:this.latitude,
     longitude:this.longitude,
    //  yes:this.yes,
    //  no:this.no
   })
   console.log(this.salonForm.value);
   this.submitted=true;

   if (!this.salonForm.valid) {
    return false;
  } else {

    this.apiService.createSalon(this.salonForm.value).subscribe(
      (res) => {
        this.socket.emit('updatedata', res);
        console.log('Salon successfully created!')
        Swal.fire(
          'Done!',
          'You added a new salon!',
          'success'
        )
        this.ngZone.run(() => this.router.navigateByUrl('/admin/manage-salons'))
      }, (error) => {
        console.log(error);
      });
  }
  }

  clickYes(){
    console.log('click yes')
    this.yes = true;
    this.no = false;
    this.salonForm.value.no = !this.salonForm.value.yes;
  }

  clickNo(){
    this.yes = false;
    this.no = true;
    console.log('click yes')
    this.salonForm.value.yes = !this.salonForm.value.no;
  }

}
