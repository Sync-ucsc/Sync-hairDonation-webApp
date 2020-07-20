// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { PatientApiService } from './../../service/patient-api.service';
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
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {
  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Patient:any = [];
   PatientNames:any=[];
  
   selectedPatient;
  
  
    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

  constructor(
    private apiService:PatientApiService,
    public dialog: MatDialog,
  ) { 
    this.socket = io.connect('http://127.0.0.1:3000');
  }

  ngOnInit(): void {
    this.getPatients();
    this.socket.on('new-patient', () => {
      this.getPatients();
    });
    this.socket.on('update-patient', () => {
      this.getPatients();
    });
    this.socket.on('delete-patient', () => {
      this.getPatients();
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

  // view Patients
  getPatients(){

    this.apiService.getPatients().subscribe((data) => {
    this.Patient = data["data"];
    this.options = data["data"];
     console.log(this.Patient);
    })

 }

 // opening the update dialog

openUpdateRef(patient){
  this.selectedPatient=patient;
  const dialogRef = this.dialog.open(uploadDialogComponent,{
    data: {
      animal:this.selectedPatient
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

  console.log(this.selectedPatient);

}

// opening the view dialog

openViewRef(patient){
  this.selectedPatient=patient;
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

 socket = io('http://127.0.0.1:3000/patient');

 lat: number;
 lon: number;
 zoom: number;
 address: string;
 placeaddress;
 private geoCoder;
//  checkSystem=false;
//  checkSms=false;
//  checkEmail=false;
 selectedPatient;




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

  constructor(private apiService:PatientApiService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.selectedPatient=data.animal;
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

 // update patients
updatePatient(){


  this.updateForm.patchValue({
    address:this.placeaddress === undefined? this.selectedPatient.address: this.placeaddress.formatted_address ,
    lat:this.lat,
    lon:this.lon
  })

    if (!this.updateForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Patient will be updated permanently`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {

          const id=this.selectedPatient.id;
          console.log(id)
          this.apiService.updatePatient(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/admin/manage-patients');
              console.log('patient updated successfully!');
              this.socket.emit('update-data', res);
            }, (error) => {
              console.log(error)
            })


        },
        // tslint:disable-next-line: only-arrow-functions
      }).then(function (result) {
        if (result.value) {
          Swal.fire(
            'Updated',
            'Patient has been updated.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Patient was not updated',
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

}

