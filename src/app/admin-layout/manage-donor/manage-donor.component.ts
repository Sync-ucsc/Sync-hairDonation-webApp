import { OnDestroy } from '@angular/core';
// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { DonorApiService } from './../../service/donor-api.service';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
// declare const Swal: any;
import Swal from 'sweetalert2';
import io from 'socket.io-client';
// socket = require('socket.io-client')('http://127.0.0.1:3000');
import { Observable } from 'rxjs';
import { startWith, map, endWith } from 'rxjs/operators';

export interface DialogData {
  animal:any;
}


@Component({
  selector: 'app-manage-donor',
  templateUrl: './manage-donor.component.html',
  styleUrls: ['./manage-donor.component.scss']
})
export class ManageDonorComponent implements OnInit ,OnDestroy {
  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Donor:any = [];
   DonorNames:any=[];
  
   selectedDonor;
  deleteDonorSub;
  dialogRef1Sub;
  dialogRef2Sub;
  getDonorsSub;
  
  
    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

  constructor(
    private apiService:DonorApiService,
    public dialog: MatDialog,
  ) 
  { 
    this.socket = io.connect('http://127.0.0.1:3000');
  }

  ngOnInit(): void {
    this.getDonors();
    this.socket.on('new-donor', () => {
      this.getDonors();
    });
    this.socket.on('update-donor', () => {
      this.getDonors();
    });
    this.socket.on('delete-donor', () => {
      this.getDonors();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);

  }

  // view donors
  getDonors(){

    this.getDonorsSub = this.apiService.getDonors().subscribe((data) => {
    this.Donor = data["data"];
    this.options = data["data"];
     console.log(this.Donor);
    })

 }

 // opening the update dialog

openUpdateRef(donor){
  this.selectedDonor=donor;
  const dialogRef = this.dialog.open(uploadDialog3Component,{
    data: {
      animal:this.selectedDonor
    }
  });

  this.dialogRef2Sub = dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

  console.log(this.selectedDonor);

}

// opening the view dialog

openViewRef(donor){
  this.selectedDonor=donor;
  const dialogRef = this.dialog.open(this.templateRef);

  this.dialogRef1Sub = dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}

  // deleting the donor

  removeDonor(donor, index) {
    console.log(donor);
    Swal.fire({
      title: 'Are you sure?',
      text: `donor will be deleted permanently`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      preConfirm: (login) => {
        this.deleteDonorSub = this.apiService.deleteDonor(donor._id).subscribe((data) => {
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
          'Donor has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Donor was not deleted',
          'error'
        )
      }
    });
 
 }

 ngOnDestroy(){
   if (this.deleteDonorSub !== undefined) {
     this.deleteDonorSub.unsubscribe();
   }
   if (this.dialogRef1Sub !== undefined) {
     this.dialogRef1Sub.unsubscribe();
   }
   if (this.dialogRef2Sub !== undefined) {
     this.dialogRef2Sub.unsubscribe();
   }
   if (this.getDonorsSub !== undefined) {
     this.getDonorsSub.unsubscribe();
   }
 }

}

// update component
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'upload-dialog3',
  templateUrl: 'upload-dialog3.html',
})
// tslint:disable-next-line: class-name
export class uploadDialog3Component implements OnDestroy {

 socket = io('http://127.0.0.1:3000/donor');

 lat: number;
 lon: number;
 zoom: number;
 address: string;
 placeaddress;
 private geoCoder;
//  checkSystem=false;
//  checkSms=false;
//  checkEmail=false;
 selectedDonor;




  updateForm= new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telePhone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    nic: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
    address: new FormControl(''),
    lat:new FormControl(''),
    lon:new FormControl('')
    // checkSystem: new FormControl(''),
    // checkSms: new FormControl(''),
    // checkEmail: new FormControl(''),
    // address:new FormControl(''),
   


  })

  @ViewChild('search')
  public searchElementRef: ElementRef;
  updateDonorSub;

  constructor(private apiService:DonorApiService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.selectedDonor=data.animal;
      this.lat=data.animal.lat;
      this.lon=data.animal.lon;
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
          this.lat = place.geometry.location.lat();
          this.lon = place.geometry.location.lng();
          this.placeaddress=place;
          this.zoom = 12;

        });
      });
    });
  }

 // update Donors
updateDonor(){


  this.updateForm.patchValue({
    address:this.placeaddress === undefined? this.selectedDonor.address: this.placeaddress.formatted_address ,
    lat:this.lat,
    lon:this.lon
  })

    if (!this.updateForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Donor will be updated permanently`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {

          const id=this.selectedDonor._id;
          this.updateDonorSub = this.apiService.updateDonor(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/admin/manage-donors');
              console.log('Donor updated successfully!');
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
            'Donor has been updated.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Donor was not updated',
            'error'
          )
        }
      });


    }


}


markerDragEnd($event: MouseEvent) {
  console.log($event);
  this.lat = $event.coords.lat;
  this.lon = $event.coords.lng;
  this.getAddress(this.lat, this.lon);
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

  ngOnDestroy(){
    if (this.updateDonorSub !== undefined) {
      this.updateDonorSub.unsubscribe();
    }
  }

}
