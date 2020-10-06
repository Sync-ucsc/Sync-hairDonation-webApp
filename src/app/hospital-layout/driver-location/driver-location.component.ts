import { TargetService } from './../../service/target.service';
import { DriverApiService } from '@services/driver-api.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.scss']
})
export class DriverLocationComponent implements OnInit {

  drivers: any = [];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  placeaddress;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private driverservice: DriverApiService,private targetService: TargetService) { }

  ngOnInit(): void {
    this.driverservice.getDrivers().subscribe(
      data => {
        console.log(data['data']);
        this.drivers = data['data'];

      }
    )
    this.mapsAPILoader.load().then(() => {
      this.latitude = 0;
      this.longitude = 0;
      this.zoom = 12;
    })
      
  }

  load(data){
    console.log(data)
    this.targetService.getAllSalonNeedToDelivers().subscribe(
      data=> {
        console.log(data);
      }
    )
  }

  markerDragEnd($event) {
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



}
