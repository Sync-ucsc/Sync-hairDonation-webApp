/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.scss']
})


export class SalonsComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  placeaddress;
  private geoCoder;

  salonForm= new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    checkSystem: new FormControl('',Validators.required),
    checkSms: new FormControl('',Validators.required),
    checkEmail: new FormControl('',Validators.required),
  })
  

  @ViewChild('search')
  public searchElementRef: ElementRef;
  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
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
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
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
   console.log(this.salonForm.value);
   console.log(this.placeaddress.formatted_address);
 }

}
