/// <reference types="@types/googlemaps" />
import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { DriverApiService } from './../../service/driver-api.service';
import { Router } from '@angular/router';

// declare const Swal: any;
import Swal from 'sweetalert2'
// import swal from 'sweetalert';

import { Observable } from 'rxjs';
import { startWith, map, endWith } from 'rxjs/operators';
import { Driver } from 'src/app/model/driver';

export interface DialogData {
  animal:any;
}

// view and delete component

@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.scss']
})
export class ManageDriversComponent implements OnInit {

  socket = io('http://localhost:3000/salon');

  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Driver:any = [];
   DriverNames:any=[];

   selectedDriver;


    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

  constructor(
      private apiService:DriverApiService,
      public dialog: MatDialog,
    ) {
      this.getDriver();
      this.socket.on('update-data', function(data: any) {
        this.getDriver();
      }.bind(this));
     }

    ngOnInit(): void {

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

   getDriver(){

      this.apiService.getDriver().subscribe((data) => {
       this.Driver = data;
      this.options = data;
       console.log(this.Driver);
      })

   }


   // deleting the salon

   removeDriver(driver, index) {
     console.log(driver);
     Swal.fire({
       title: 'Are you sure?',
       text: `Driver will be removed permanently`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       reverseButtons: true,
       preConfirm: (login) => {
         this.apiService.deleteDriver(driver._id).subscribe((data) => {
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
           'Driver has been removed.',
           'success'
         )
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Driver was not removed',
           'error'
         )
       }
     });

    // if(window.confirm('Are you sure?')) {
    //   this.apiService.deleteSalon(salon._id).subscribe((data) => {
    //       this.Salon.splice(index, 1);
    //     }
    //   )
    // }
  }

  // opening the update dialog

  openUpdateRef(driver){
    this.selectedDriver=driver;
    const dialogRef = this.dialog.open(uploadDialogComponent,{
      data: {
        animal:this.selectedDriver
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    console.log(this.selectedDriver);

  }

  //opening the view dialog

  openViewRef(driver){
    this.selectedDriver=driver;
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

   socket = io('http://localhost:3000/driver');

   latitude: number;
   longitude: number;
   zoom: number;
   address: string;
   placeaddress;
   private geoCoder;
   checkSystem=false;
   checkSms=false;
   checkEmail=false;
   selectedDriver;




    updateForm= new FormGroup({
      fname: new FormControl('',Validators.required),
      lname: new FormControl('',Validators.required),
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

    constructor(private apiService:DriverApiService,
      public dialog: MatDialog,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.selectedDriver=data.animal;
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
  updateDriver(){


    this.updateForm.patchValue({
      address:this.placeaddress === undefined? this.selectedDriver.address: this.placeaddress.formatted_address ,
      latitude:this.latitude,
      longitude:this.longitude
    })

      if (!this.updateForm.valid) {
        return false;
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: `Driver details will be updated permanently`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          preConfirm: (login) => {

            const id=this.selectedDriver._id;
            this.apiService.updateDriver(id, this.updateForm.value)
              .subscribe(res => {
                this.router.navigateByUrl('/admin/manage-drivers');
                console.log('Driver details updated successfully!');
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
              'Driver details has been updated.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Driver details was not updated',
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