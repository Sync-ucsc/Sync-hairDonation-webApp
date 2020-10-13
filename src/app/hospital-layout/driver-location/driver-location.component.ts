import { Driver } from './../../model/driver';
import { data } from 'jquery';
import { TargetService } from './../../service/target.service';
import { DriverApiService } from '@services/driver-api.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, NgZone, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.scss']
})
export class DriverLocationComponent implements OnInit , OnDestroy{

  drivers: any = [];
  latitude: number;
  longitude: number;
  latitude1: number =0;
  longitude1: number =0;
  zoom: number;
  address: string;
  placeaddress;
  private geoCoder;
  target = [];
  forMap;
  features = [];
  driver;
  myVar;
  getAllTargetSub;
  getDriversSub;

  icons = {
    van: {
      icon: 'assets/images/van.png'
    },
    usalon: {
      icon: 'assets/images/usalon.png'
    },
    csalon: {
      icon: 'assets/images/csalon.png'
    }
  };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private driverservice: DriverApiService,
    private targetService: TargetService
    ) { 
    
    this.getAllTarget();
  }

  ngOnInit(): void {
    this.getDriversSub =this.driverservice.getDrivers().subscribe(
      data => {
        this.drivers = data['data'];
      }
    )
    this.mapsAPILoader.load().then(() => {
      this.latitude = 6.893358;
      this.longitude = 79.861964;
      this.zoom = 14;
    })

    this.myVar = setInterval(()=>{
      this.getAllTarget();
    },5000)
  }

  getDriverLocation(x){
    this.driverservice.getDrivers().subscribe(
      data => {
       data['data'].forEach(e=>{
         if(e.email === x){
           console.log(e)
           if(e.lat !== 0 && e.lon !== 0)  {
             if ((e.lat !== undefined && e.lon !== undefined)){
               this.latitude = e.lat
               this.longitude = e.lon
               this.latitude1 = e.lat
               this.longitude1 = e.lon
             } else {
               this.latitude1 = 0
               this.longitude1 = 0
             }
           } else {
             this.latitude1 = 0
             this.longitude1 = 0
           }
         }
       })
      }
    )
  }

  load(data){
    console.log(data)
    this.getDriverLocation(data)
    this.driver =data;
    if(data !== undefined){
      this.forMap = 0;
    }
    this.features =[];
    this.target.forEach( e => {
      if (data === e.driverEmail && e.status === 'NOT_COMPLETED'){
        this.forMap = e;
        console.log(this.latitude1 + ' ' + this.longitude)
        if (this.latitude1 === 0 && this.longitude1 === 0){
          e.targets.forEach(ea => {
            console.log('h')
            if (this.latitude1 === 0 && this.longitude1 === 0){
              this.mapsAPILoader.load().then(() => {
                this.latitude = ea.lat;
                this.longitude = ea.lng;
                this.zoom = 14;
              })
            }
            if (ea.status == 'Delivered') {
              this.features.push({
                lat: ea.lat,
                lon: ea.lng,
                type: 'csalon'
              })
            } else {
              this.features.push({
                lat: ea.lat,
                lon: ea.lng,
                type: 'usalon'
              })
            }
          });
        } else {
          console.log('y')
          this.features.push({
            lat: this.latitude,
            lon: this.longitude,
            type: 'van'
          })
          e.targets.forEach(ea => {
            if (ea.status == 'Delivered') {
              this.features.push({
                lat: ea.lat,
                lon: ea.lng,
                type: 'csalon'
              })
            } else {
              this.features.push({
                lat: ea.lat,
                lon: ea.lng,
                type: 'usalon'
              })
            }
          });
        }
      }

    });

  }



  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
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

  getAllTarget(){
    this.getAllTargetSub = this.targetService.getAllTarget().subscribe(
      data => {
        this.target = data['data'];
        this.features = [];
        this.load(this.driver)
      },
      error => {

      }
    )
  }

  ngOnDestroy(){
    clearTimeout(this.myVar);
    if (this.getDriversSub !== undefined) {
      this.getDriversSub.unsubscribe();
    }
    if (this.getAllTargetSub !== undefined) {
      this.getAllTargetSub.unsubscribe();
    }
  }



}
