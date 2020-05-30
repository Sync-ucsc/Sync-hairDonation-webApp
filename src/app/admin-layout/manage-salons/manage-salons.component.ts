/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef } from '@angular/core';
import { SalonApiService } from './../../service/salon-api.service';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-salons',
  templateUrl: './manage-salons.component.html',
  styleUrls: ['./manage-salons.component.scss']
})

export class ManageSalonsComponent implements OnInit {
 
 
 Salon:any = [];

 selectedSalon;

 latitude: number;
 longitude: number;
 zoom: number;
 address: string;
 placeaddress;
 private geoCoder;
 checkSystem=false;
 checkSms=false;
 checkEmail=false;

 updateForm= new FormGroup({
  name: new FormControl('',Validators.required),
  email: new FormControl('',[Validators.required,Validators.email]),
  telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
  checkSystem: new FormControl(''),
  checkSms: new FormControl(''),
  checkEmail: new FormControl(''),
  address:new FormControl(''),
  latitude:new FormControl(''),
  longitude:new FormControl('')
  

})
 
 @ViewChild('dialog')
public updateRef: TemplateRef<any>; 


 @ViewChild('search')
public searchElementRef: ElementRef;

 

  constructor(private apiService:SalonApiService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,) {
    this.getSalons();
   }

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
 
//view salons

 getSalons(){
  
    this.apiService.getSalons().subscribe((data) => {
     this.Salon = data;
    })    
  
 }


 //deleting the salon 

 removeSalon(salon, index) {
   console.log(salon);
  if(window.confirm('Are you sure?')) {
      this.apiService.deleteSalon(salon._id).subscribe((data) => {
        this.Salon.splice(index, 1);
      }
    )    
  }
}

//opening the update dialog

openUpdateRef(salon){
  this.selectedSalon=salon;
  console.log(this.selectedSalon);
  this.dialog.open(this.updateRef);
}


//update salons
updateSalon(){


  this.updateForm.patchValue({
    address:this.placeaddress.formatted_address,
    latitude:this.latitude,
    longitude:this.longitude
  })

    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id=this.selectedSalon._id;
        this.apiService.updateSalon(id, this.updateForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/admin/manage-salons');
            console.log('Salon updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  

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

}
