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

  getPatients(){
    
    this.apiService.getPatients().subscribe((data) => {
    this.Patient = data["data"];
    this.options = data["data"];
     console.log(this.Patient);
    })

 }

}
