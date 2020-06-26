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
// socket = require('socket.io-client')('http://localhost:3000');
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
export class ManageDonorComponent implements OnInit {
  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Donor:any = [];
   DonorNames:any=[];
  
   selectedDonor;
  
  
    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

  constructor(
    private apiService:DonorApiService,
    public dialog: MatDialog,
  ) 
  { 
    this.socket = io.connect('http://localhost:3000');
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
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);

  }

  // view donors
  getDonors(){

    this.apiService.getDonors().subscribe((data) => {
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

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

  console.log(this.selectedDonor);

}

// opening the view dialog

openViewRef(donor){
  this.selectedDonor=donor;
  const dialogRef = this.dialog.open(this.templateRef);

  dialogRef.afterClosed().subscribe(result => {
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
        this.apiService.deleteDonor(donor._id).subscribe((data) => {
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

}

// update component
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'upload-dialog3',
  templateUrl: 'upload-dialog3.html',
})
// tslint:disable-next-line: class-name
export class uploadDialog3Component {

 socket = io('http://localhost:3000/donor');

//  latitude: number;
//  longitude: number;
//  zoom: number;
//  address: string;
//  placeaddress;
//  private geoCoder;
//  checkSystem=false;
//  checkSms=false;
//  checkEmail=false;
 selectedDonor;




  updateForm= new FormGroup({
    firstName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telePhone: new FormControl('',[Validators.required,Validators.minLength(10)])
    // checkSystem: new FormControl(''),
    // checkSms: new FormControl(''),
    // checkEmail: new FormControl(''),
    // address:new FormControl(''),
    // latitude:new FormControl(''),
    // longitude:new FormControl('')


  })

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private apiService:DonorApiService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.selectedDonor=data.animal;
      // this.latitude=data.animal.latitude;
      // this.longitude=data.animal.longitude;
      // this.zoom=12;
      // this.address=data.animal.address;
      console.log(data.animal);
    ;
   }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {

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

 // update Donors
updateDonor(){


  // this.updateForm.patchValue({
  //   address:this.placeaddress === undefined? this.selectedDonor.address: this.placeaddress.formatted_address ,
  //   latitude:this.latitude,
  //   longitude:this.longitude
  // })

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
          this.apiService.updateDonor(id, this.updateForm.value)
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






// markerDragEnd($event: MouseEvent) {
//   console.log($event);
//   this.latitude = $event.coords.lat;
//   this.longitude = $event.coords.lng;
//   this.getAddress(this.latitude, this.longitude);
// }

// getAddress(latitude, longitude) {
//   this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
//     console.log(results);
//     console.log(status);
//     if (status === 'OK') {
//       if (results[0]) {
//         this.zoom = 12;
//         this.address = results[0].formatted_address;
//       } else {
//         window.alert('No results found');
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status);
//     }

//   });
// }

}
