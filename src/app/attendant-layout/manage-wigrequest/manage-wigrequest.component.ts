import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { PatientApiService } from './../../service/patient-api.service';
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
  selector: 'app-manage-wigrequest',
  templateUrl: './manage-wigrequest.component.html',
  styleUrls: ['./manage-wigrequest.component.scss']
})
export class ManageWigrequestComponent implements OnInit {

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
    this.socket = io.connect('http://localhost:3000');
   }

  ngOnInit(): void {
    this.getPatients();
    this.socket.on('new-patient', () => {
      this.getPatients();
    });
    this.socket.on('update-patient', () => {
      this.getPatients();
    });
    this.socket.on('new-wig-request', () => {
      this.getPatients();
    });
    this.socket.on('accept-wig-request', () => {
      this.getPatients();
    });
    this.socket.on('decline-wig-request', () => {
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

  getPatients(){
    
    this.apiService.getPatients().subscribe((data) => {
    this.Patient = data["data"];
    this.options = data["data"];
     console.log(this.Patient);
    })
 }

acceptWigrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This wig Request will be accepted`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, accpet it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.apiService.acceptWigrequest(id).subscribe((data) => {
        console.log(data);
        this.socket.emit('accept-wig-request', data);
        if(!data)
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
        'Accepted!',
        'Patient wig request has been accepted',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Patient wig request was not accepttd',
        'error'
      )
    }
  });
}

declineWigrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This wig Request will be declined`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Decline it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.apiService.declineWigrequest(id).subscribe((data) => {
        console.log(data);
        this.socket.emit('decline-wig-request', data);
        if(!data)
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
        'Declined!',
        'Patient wig request has been declined',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Patient wig request was not declined',
        'error'
      )
    }
  });
}

}
