import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent, AgmCoreModule } from '@agm/core';
import { DonorApiService } from './../../service/donor-api.service';
import { SalonApiService } from './../../service/salon-api.service';
import { TokenService } from './../../service/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
declare var google:any;
import { computeDistanceBetween } from 'spherical-geometry-js';

@Component({
  selector: 'app-donor-request',
  templateUrl: './donor-request.component.html',
  styleUrls: ['./donor-request.component.scss']
})


export class DonorRequestComponent implements OnInit,OnDestroy {

  socket = io('http://localhost:3000/donor');
  today = new Date()

  submitted=false;
  email:string;
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
  finished=false;
  canceled = false;
  validDate: Date;
  date: string;
  requestDay: string;
  selectedDonor
  selectedSalon
  donationRequestForm;
  getDonorByEmailSub;
  getSalonByEmailSub;
  donorRequsetSub;

  unfinishedDonateRequest = false;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private apiService: DonorApiService,
    private salonService: SalonApiService,
    private tokenService: TokenService, 
    private _toastr: ToastrService
  ) {

      this.requestDay = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }

  ngOnInit(): void {

    let now = new Date();

    this.date =  new Date().toJSON().split('T')[0];

    this.email=this.tokenService.getEmail();
    console.log(this.email);
    this.getDonorByEmailSub = this.apiService.getDonorByEmail(this.email).subscribe((data)=>{
      this.selectedDonor=data['data'];

      this.unfinishedDonateRequest = this.selectedDonor.request
      .filter( r => !r.finished && !r.canceled)
      .length > 0;

      console.log(this.unfinishedDonateRequest)
      console.log(this.selectedDonor)
    })

      

    this.donationRequestForm = new FormGroup({
      address:new FormControl(''),
      latitude:new FormControl(''),
      longitude:new FormControl(''),
      yes:new FormControl(false),
      no:new  FormControl(false),
      validDate: new FormControl(Date),
      requestDay: new FormControl(this.requestDay),
      finished:new FormControl(false),
      canceled:new FormControl(false),
      email: new FormControl(this.email)
    })

    // this.mapsAPILoader.load().then(() => {

    //   // tslint:disable-next-line: new-parens
    //   this.geoCoder = new google.maps.Geocoder;

    //   const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       // get the place result
    //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       // verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       // set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.placeaddress=place;
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }



loadMap(){
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


 async onSubmit(){
   try{

    if (this.unfinishedDonateRequest) {
      this._toastr.warning(`your last request is still processing`);
      // this.Type = null;
      return;
    }

    this.donationRequestForm.patchValue({
      address:this.placeaddress === undefined? this.selectedDonor.address: this.placeaddress.formatted_address,
      latitude:this.latitude === undefined? this.selectedDonor.lat: this.latitude,
      longitude:this.longitude === undefined? this.selectedDonor.lon: this.longitude,
    })
 
    const donorCoordinate = new google.maps.LatLng(
      this.latitude === undefined? this.selectedDonor.lat: this.latitude,   
      this.longitude === undefined? this.selectedDonor.lon: this.longitude
    );

    const response = await this.salonService.getSalons().toPromise();
    // @ts-ignore
    const salons = response.data;

    const selectedSalon = salons.map( salon => {
     
      const salonCoordinate = new google.maps.LatLng(salon.latitude,salon.longitude);

      salon.distance = computeDistanceBetween(salonCoordinate, donorCoordinate )

      return salon;

    }).filter( salon => { 
      return salon.distance <= 7000
    }).sort((a, b) => {
      if (a.distance > b.distance) {
          return 1
      } else if (a.distance < b.distance) {
          return -1 
      } else {
          return 0
      }
    })

    console.log(selectedSalon)

   this.submitted=true;

   if (!this.donationRequestForm.valid) {
    return false;
  } else {

    this.apiService.donorRequset({
      ...this.donationRequestForm.value , 
      // selectedSalon:selectedSalon,
      district: selectedSalon[0].district
    }).subscribe(
      data => {
        console.log('Your requset has been recorded!'+data)
        Swal.fire(
          'Done!',
          'Your requset has been recorded!',
          'success'
        )
        this.router.navigateByUrl('/donor/dashboard');
      }, (error) => {
        console.log(error);
        Swal.fire(
          'error!',
          'Request failed!',
          'error'
        )
      });
      this.apiService.changeNearSalon({
        email: this.email,
        selectedSalon:selectedSalon
      }).subscribe(
        data => {
          console.log('near salon updated'+data)
        },(error) => {
          console.log(error);
        }
      );
  }

   }catch(error){
     console.log(error)
   }
  }

  clickYes(){
    console.log('click yes')
    this.yes = true;
    this.no = false;
    this.donationRequestForm.value.no = !this.donationRequestForm.value.yes;
  }

  clickNo(){
    this.yes = false;
    this.no = true;
    console.log('click yes')
    this.donationRequestForm.value.yes = !this.donationRequestForm.value.no;
    setTimeout(() => this.loadMap(), 1000);
  }

  ngOnDestroy() {

    if (this.getDonorByEmailSub !== undefined) {
      this.getDonorByEmailSub.unsubscribe();
    }
    if (this.getSalonByEmailSub !== undefined) {
      this.getSalonByEmailSub.unsubscribe();
    }
    if (this.donorRequsetSub !== undefined) {
      this.donorRequsetSub.unsubscribe();
    }
  }

}
