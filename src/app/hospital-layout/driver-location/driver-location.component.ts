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
        console.log(data['data']);
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
    },60000)
  }

  load(data){
    console.log('hihihi')
    this.driver =data;
    this.forMap = 0;
    this.target.forEach( e => {
      
      if (data === e.driverEmail && e.status === 'NOT_COMPLETED'){
        this.forMap = e;
        this.features.push({
          lat: 6.897889,
          lon: 79.860133,
          type: 'van'
        })
        e.targets.forEach( ea => {
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

    });

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
