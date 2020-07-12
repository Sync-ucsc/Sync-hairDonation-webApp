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
  selector: 'app-wigrequset-verify',
  templateUrl: './wigrequset-verify.component.html',
  styleUrls: ['./wigrequset-verify.component.scss']
})
export class WigrequsetVerifyComponent implements OnInit {
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
    this.socket.on('update-wig-request', () => {
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

finishWigrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This wig Request will be mark as completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, complete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.apiService.finishWigrequest(id).subscribe((data) => {
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
        'Finished!',
        'Patient wig request mark as completed',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Patient wig request was not mark as completed',
        'error'
      )
    }
  });
}

cancelWigrequest(id){
  Swal.fire({
    title: 'Are you sure?',
    text: `This wig Request will be marked as not completed`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (login) => {
      this.apiService.cancelWigrequest(id).subscribe((data) => {
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
        'Patient wig request has been declined marked as not completed',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Patient wig request was not marked as not completed',
        'error'
      )
    }
  });
}

}
