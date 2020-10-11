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
import {DbNeedToDeliver} from '@model/database/dbNeedToDeliver';
import {BackendResponse} from '@model/backendResponse';
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
   selectedSalon
   email;
   getSalonByEmailSub;
   lastRequestData: DbNeedToDeliver;
   wigcount;
  
  
    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

    constructor(
      private apiService:DonorApiService,
      public dialog: MatDialog,
      private salonService: SalonApiService,
      private tokenService: TokenService,
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
    return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);

  }

  // view donors
  getDonors(){

    this.apiService.getDonors().subscribe((data) => {
    this.Donor = data["data"];
    this.options = data["data"];
     console.log(this.Donor);
    })

 }

 changeWigcount(email){

  if(this.selectedSalon.NeedToDeliverStatus.length==0){
    const NeedToDeliverObject = {
      status: "NeedToDeliver",
      createdAt: new Date(),
      wigCount: 1,
      deliveryDate:new Date(),
    } as DbNeedToDeliver;

      this.finishDonorrequestSub = this.salonService.addNeedToDeliver(NeedToDeliverObject, email).subscribe((data) => {
        console.log(data);
        this.socket.emit('update-donor-request', data);
        if(!data)
          Swal.showValidationMessage(
            `Request failed`
          )
       }
      )
  }else {
    for(let i=0;i<this.selectedSalon.NeedToDeliverStatus.length;i++){
      if(this.selectedSalon.NeedToDeliverStatus[i].status == "NeedToDeliver"){
        this.wigcount = this.selectedSalon.NeedToDeliverStatus[i].wigCount + 1;
        return this.finishDonorrequestSub = this.salonService.updateWigCount(this.selectedSalon.NeedToDeliverStatus[i]._id, this.wigcount).subscribe((data) => {
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
  }

 }

 finishDonorrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This donation will be mark as completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, complete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.finishDonorrequestSub = this.apiService.finishDonorrequest(id).subscribe((data) => {
        console.log(data);
        this.socket.emit('update-donor-request', data);
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

cancelDonorrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This Donation Request will be marked as not completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.cancelDonorrequestSub = this.apiService.cancelDonorrequest(id).subscribe((data) => {
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
