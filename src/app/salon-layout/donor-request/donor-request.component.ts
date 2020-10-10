import { ViewCalendarService } from '@services/viewcalendar.service';
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

import { SalonApiService } from './../../service/salon-api.service';
import { TokenService } from './../../service/token.service';

export interface DialogData {
  animal:any;
}


@Component({
  selector: 'app-donor-request',
  templateUrl: './donor-request.component.html',
  styleUrls: ['./donor-request.component.scss']
})
export class DonorRequestComponent implements OnInit {

  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Donor:any = [];
   DonorNames:any=[];
   finishDonorrequestSub;
   cancelDonorrequestSub;
  finishDonorrequestSub2;
  cancelDonorrequestSub2;
   selectedSalon
   email;
   getSalonByEmailSub;
    donorAppointment = [];

  
  
    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

    constructor(
      private apiService:DonorApiService,
      public dialog: MatDialog,
      private salonService: SalonApiService,
      private tokenService: TokenService,
      private _ViewCalendarService: ViewCalendarService,
    ) 
    { 
      this.socket = io.connect('http://127.0.0.1:3000');
    }

  ngOnInit(): void {

    this.email=this.tokenService.getEmail();
    console.log(this.email);
    this.getSalonByEmailSub = this.salonService.getSalonByEmail(this.email).subscribe((data)=>{
      this.selectedSalon=data['data'];

      console.log(this.selectedSalon)
    })

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
    this.socket.on('update-donor-request', () => {
      this.getDonors();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.donorAppointment.filter(option => option.donor.firstName.toLowerCase().indexOf(filterValue) === 0);

  }

  // view donors
  getDonors(){
    this.donorAppointment = [];
    this.apiService.getDonors().subscribe((data) => {
    this.Donor = data['data'];
    this.options = data['data'];
    this._ViewCalendarService.getAll().subscribe(
        data => {
          console.log(data)
          data.data.forEach(element => {
            if (element.salonEmail === this.tokenService.getEmail()) {
              if (element.DonorRequest === true && element.complete === false && element.canceled === false) {
                this.Donor.forEach(element1 => {
                  if (element.Donoremail === element1.email){
                    this.donorAppointment.push({
                      Donoremail: element.Donoremail,
                      appointmentDate: element.appointmentDate,
                      appointmentTimeSlot: element.appointmentTimeSlot,
                      salonEmail: element.salonEmail,
                      systemRequestDate: element.systemRequestDate,
                      _id: element._id,
                      donor: element1
                    }
                    )

                  }
                });
                }
            }
          });
          console.log(this.donorAppointment)
        }
      )

    })
  }


 changeWigcount(email){
  preConfirm: (login) => {
    this.finishDonorrequestSub = this.salonService.getNeedToDeliver(email).subscribe((data) => {
      console.log(data);
      this.socket.emit('update-donor-request', data);
      if(!data)
        Swal.showValidationMessage(
          `Request failed`
        )
     }
    )

  }
 }

  finishDonorrequest(data2){
  Swal.fire({
    title: 'Are you sure?',
    text: `This donation will be mark as completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, complete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.finishDonorrequestSub = this.apiService.finishDonorrequest(data2['donor'].lastRequest._id).subscribe((data) => {
        console.log(data);
        this.getDonors();
        this.socket.emit('update-donor-request', data);
        if(!data)
          Swal.showValidationMessage(
            `Request failed`
          )
       }
      )
      this.finishDonorrequestSub2 = this._ViewCalendarService.finishDonorrequest(data2._id).subscribe((data) => {
        console.log(data);
        this.getDonors();
        this.socket.emit('update-donor-request', data);
        if (!data)
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
        'Finished!',
        'Donation mark as completed',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Donation was not mark as completed',
        'error'
      )
    }
  });
}

cancelDonorrequest(data2){
  console.log(data2)
  Swal.fire({
    title: 'Are you sure?',
    text: `This Donation Request will be marked as not completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.cancelDonorrequestSub = this.apiService.cancelDonorrequest(data2['donor'].lastRequest._id).subscribe((data) => {
        console.log(data);
        this.getDonors();
        this.socket.emit('decline-wig-request', data);
        if(!data)
          Swal.showValidationMessage(
            `Request failed`
          )
       }
      )

      this.cancelDonorrequestSub2 = this._ViewCalendarService.cancelDonorrequest(data2._id).subscribe((data) => {
        console.log(data);
        this.getDonors()
        this.socket.emit('decline-wig-request', data);
        if (!data)
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
        'Success!',
        'Donation has been declined marked as not completed',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Donationt was not marked as not completed',
        'error'
      )
    }
  });
}

}
