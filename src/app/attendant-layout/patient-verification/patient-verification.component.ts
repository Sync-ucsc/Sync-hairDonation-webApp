import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
// socket = require('socket.io-client')('http://localhost:3000');
import {UserServiceService} from './../../service/user-service.service';
import {PatientApiService} from './../../service/patient-api.service'

@Component({
  selector: 'app-patient-verification',
  templateUrl: './patient-verification.component.html',
  styleUrls: ['./patient-verification.component.scss'],
})
export class PatientVerificationComponent implements OnInit {
  Patient: any = [];
  PatientNames: any = [];
  socket;
  selectedPatient;
  options: any = [];
  myControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;

  constructor(private apiService: UserServiceService, private apiService2: PatientApiService) {
    this.socket = io.connect('http://localhost:3000');
  }

  ngOnInit(): void {
    this.getUsers();
    this.socket.on('new-user', () => {
      this.getUsers();
    });
    this.socket.on('update-user', () => {
      this.getUsers();
    });
    this.socket.on('delete-user', () => {
      this.getUsers();
    });
    this.socket.on('new-patient', () => {
      this.getUsers();
    });
    this.socket.on('update-patient', () => {
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
    this.apiService.getUsers().subscribe((data) => {
      // @ts-ignore
      this.Patient = data.data.filter(d => !d.active && d.role === `patient`)
      this.options = this.Patient;
      // this.Patient=data["data"];
      // this.options = data["data"];
      console.log(this.Patient);
    });
  }

  deleteUsers(patient) {
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
        this.apiService.deleteUser(patient._id).subscribe((data) => {
          console.log(data);
          this.socket.emit('updatedata', data);
          if (!data.msg) Swal.showValidationMessage(`Request failed`);
        });
        this.apiService2.deletePatient(patient._id).subscribe((data) => {
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
          'Error, couldn\'t decline the patient request',
          'error'
        );
      }
    });
  }


  // Deleting a patient after declining the request

  viewPatientReport(patient) {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.firstName.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
