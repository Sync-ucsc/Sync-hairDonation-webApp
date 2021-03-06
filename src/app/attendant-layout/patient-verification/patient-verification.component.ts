import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
// socket = require('socket.io-client')('http://127.0.0.1:3000');
import {UserService} from './../../service/user.service';
import {PatientApiService} from './../../service/patient-api.service'
import {MatDialog,} from '@angular/material/dialog';

@Component({
  selector: 'app-patient-verification',
  templateUrl: './patient-verification.component.html',
  styleUrls: ['./patient-verification.component.scss'],
})
export class PatientVerificationComponent implements OnInit,OnDestroy {
  Patient: any = [];
  PatientNames: any = [];
  socket;
  getUsersSub;
  selectedPatient;
  activeUserSub;
  removePatientSub;
  deletePatientSub;
  getPatientByEmailSub;
  dialogRef1Sub;
  options: any = [];
  myControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
  imageUrl;

  constructor(
    private apiService: UserService,
    private apiService2: PatientApiService,
    public dialog: MatDialog
  ) {
    this.socket = io.connect('http://127.0.0.1:3000');
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.getUsers();
    },1000);
    
    this.socket.on('new-patient', () => {
      this.getUsers();
    });
    this.socket.on('delete-patient', () => {
      this.getUsers();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // Getting the patients from user collection for display
  getUsers() {
    this.getUsersSub = this.apiService.getUsers().subscribe((data) => {
      // @ts-ignore
      this.Patient = data.data.filter((d) => !d.active && d.role === `patient`);
      this.options = this.Patient;
      // this.Patient=data["data"];
      // this.options = data["data"];
      console.log(this.Patient);
    });
  }

  acceptPatient(patient) {

    console.log(patient)

    Swal.fire({
      title: 'Are you sure?',
      text: `This patient will be added to the system`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,accept it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      preConfirm: (login) => {
        // methana update ekak enna one; active=true krnna one
        this.activeUserSub = this.apiService.activeUser(patient.email).subscribe((data) => {
          console.log(data);
          this.socket.emit('updatedata', data);
          // @ts-ignore
          if (!data.msg) Swal.showValidationMessage(`Request failed`);
        });
        // methana aye get users function eka awilla patient array eka update krnna one; active nathi un withrak pennana
        this.getUsers();
      },
      // tslint:disable-next-line: only-arrow-functions
    }).then(function (result) {
      if (result.value) {
        Swal.fire('Deleted!', 'Patient request has been accepted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You didn\'t accept the patient request',
          'error'
        );
      }
    });
  }

  // Deleting a patient after declining the request
  declinePatient(patient) {
    console.log(patient);
    Swal.fire({
      title: 'Are you sure?',
      text: `This patient will be deleted permanently`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      preConfirm: (login) => {
        // me delete eke awulak enwa delete wenne na
        this.removePatientSub =this.apiService.removePatient(patient.email).subscribe((data) => {
          console.log(data);
          this.socket.emit('updatedata', data);
          // @ts-ignore
          if (!data.msg) Swal.showValidationMessage(`Request failed`);
        });
        this.deletePatientSub = this.apiService2.deletePatient(patient._id).subscribe((data) => {
          console.log(data);
          this.socket.emit('updatedata', data);
          if (!data.msg) Swal.showValidationMessage(`Request failed`);
        });
      },
      // tslint:disable-next-line: only-arrow-functions
    }).then(function (result) {
      if (result.value) {
        Swal.fire('Deleted!', 'Patient request has been declined.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You didn\'t decline the patient request',
          'error'
        );
      }
    });
  }

  async viewPatientReport(patient) {
    console.log(patient);
    this.getPatientByEmailSub = this.apiService2.getPatientByEmail(patient.email).subscribe(
      data => {
        console.log(data);
        this.selectedPatient = data.data;
        this.imageUrl = this.selectedPatient.patientReport;
        const dialogRef = this.dialog.open(this.templateRef);

        this.dialogRef1Sub = dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.firstName.toLowerCase().indexOf(filterValue) === 0
    );
  }


  ngOnDestroy() {

    if (this.getUsersSub !== undefined) {
      this.getUsersSub.unsubscribe();
    }
    if (this.getPatientByEmailSub !== undefined) {
      this.getPatientByEmailSub.unsubscribe();
    }
    if (this.dialogRef1Sub !== undefined) {
      this.dialogRef1Sub.unsubscribe();
    }
    if (this.activeUserSub !== undefined) {
      this.activeUserSub.unsubscribe();
    }
    if (this.removePatientSub !== undefined) {
      this.removePatientSub.unsubscribe();
    }
    if (this.deletePatientSub !== undefined) {
      this.deletePatientSub.unsubscribe();
    }

  }
}
