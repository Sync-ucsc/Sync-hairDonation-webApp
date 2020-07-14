/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { SalonApiService } from './../../service/salon-api.service';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
// declare const Swal: any;
import Swal from 'sweetalert2';
import io from 'socket.io-client';
// socket = require('socket.io-client')('http://127.0.0.1:3000');
import { Observable } from 'rxjs';
import { startWith, map, endWith } from 'rxjs/operators';
import { Salon } from 'src/app/model/salon';

export interface DialogData {
  animal:any;
}

// view and delete component
@Component({
  selector: 'app-manage-salons',
  templateUrl: './manage-salons.component.html',
  styleUrls: ['./manage-salons.component.scss']
})

export class ManageSalonsComponent implements OnInit {
socket;
@ViewChild('dialog') templateRef: TemplateRef<any>;
 Salon:any = [];
 SalonNames:any=[];

 selectedSalon;


  myControl = new FormControl('',Validators.required);
  options:any =[];
  filteredOptions: Observable<string[]>;

constructor(
    private apiService:SalonApiService,
    public dialog: MatDialog,
  ) {

     this.socket = io.connect('http://127.0.0.1:3000');

   }

  ngOnInit(): void {
    this.getSalons();
    this.socket.on('new-salon', () => {
      this.getSalons();
    });
    this.socket.on('update-salon', () => {
      this.getSalons();
    });
    this.socket.on('delete-salon', () => {
      this.getSalons();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // this.myControl.valueChanges.subscribe((data) => {
    //   if (!this.myControl.valid) {
    //     this.filteredOptions = new Observable<string[]>();
    //   }
    // });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);

  }

// view salons

 getSalons(){

    this.apiService.getSalons().subscribe((data) => {
     this.Salon = data["data"];
    this.options = data["data"];
     console.log(this.Salon);
    })

 }


 // deleting the salon

 removeSalon(salon, index) {
   console.log(salon);
   Swal.fire({
     title: 'Are you sure?',
     text: `Salon will be deleted permanently`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true,
     preConfirm: (login) => {
       this.apiService.deleteSalon(salon._id).subscribe((data) => {
         console.log(data);
         this.socket.emit('updatedata', data);
         if(!data.msg)
           Swal.showValidationMessage(
             `Request failed`
           )
        }
       )

     },
     // tslint:disable-next-line: only-arrow-functions
   }).then(function (result) {
     if (result.value) {
       Swal.fire(
         'Deleted!',
         'Salon has been deleted.',
         'success'
       )
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'Cancelled',
         'Salon was not deleted',
         'error'
       )
     }
   });

  
}

// opening the update dialog

openUpdateRef(salon){
  this.selectedSalon=salon;
  const dialogRef = this.dialog.open(uploadDialogComponent,{
    data: {
      animal:this.selectedSalon
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

  console.log(this.selectedSalon);

}

// opening the view dialog

openViewRef(salon){
  this.selectedSalon=salon;
  const dialogRef = this.dialog.open(this.templateRef);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}


}


// update component
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'upload-dialog',
  templateUrl: 'upload-dialog.html',
})
// tslint:disable-next-line: class-name
export class uploadDialogComponent {

 socket = io('http://127.0.0.1:3000/salon');

 latitude: number;
 longitude: number;
 zoom: number;
 address: string;
 placeaddress;
 private geoCoder;
 checkSystem=false;
 checkSms=false;
 checkEmail=false;
 selectedSalon;




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

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private apiService:SalonApiService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.selectedSalon=data.animal;
      this.latitude=data.animal.latitude;
      this.longitude=data.animal.longitude;
      this.zoom=12;
      this.address=data.animal.address;
      console.log(data.animal);
    ;
   }

  // tslint:disable-next-line: use-lifecycle-interface
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

 // update salons
updateSalon(){


  this.updateForm.patchValue({
    address:this.placeaddress === undefined? this.selectedSalon.address: this.placeaddress.formatted_address ,
    latitude:this.latitude,
    longitude:this.longitude
  })

    if (!this.updateForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Salon will be updated permanently`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {

          const id=this.selectedSalon._id;
          this.apiService.updateSalon(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/admin/manage-salons');
              console.log('Salon updated successfully!');
              this.socket.emit('updatedata', res);
            }, (error) => {
              console.log(error)
            })


        },
        // tslint:disable-next-line: only-arrow-functions
      }).then(function (result) {
        if (result.value) {
          Swal.fire(
            'Updated',
            'Salon has been updated.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Salon was not updated',
            'error'
          )
        }
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