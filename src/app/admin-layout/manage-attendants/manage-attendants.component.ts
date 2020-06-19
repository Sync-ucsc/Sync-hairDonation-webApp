/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, TemplateRef,NgModule, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { AttendantApiService } from './../../service/attendant-api.service';
import { MatDialog , MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

// declare const Swal: any;
import Swal from 'sweetalert2';
import io from 'socket.io-client';
// socket = require('socket.io-client')('http://localhost:3000');
import { Observable } from 'rxjs';
import { startWith, map, endWith } from 'rxjs/operators';
import { Attendant } from 'src/app/model/attendant';

export interface DialogData {
  animal:any;
}

// view and delete component
@Component({
  selector: 'app-manage-attendants',
  templateUrl: './manage-attendants.component.html',
  styleUrls: ['./manage-attendants.component.scss']
})

export class ManageAttendantsComponent implements OnInit {
  socket;
@ViewChild('dialog') templateRef: TemplateRef<any>;
 Attendant:any = [];
 AttendantNames:any=[];
 
 selectedAttendant;


  myControl = new FormControl('',Validators.required);
  options:any =[];
  filteredOptions: Observable<string[]>;

constructor(
    private apiService:AttendantApiService,
    public dialog: MatDialog,
  ) {
    
    this.socket = io.connect('http://localhost:3000');


   }

   ngOnInit(): void { 
    this.getAttendants();
    this.socket.on('new-Attendant', () => {
      this.getAttendants();
    });
    this.socket.on('update-Attendant', () => {
      this.getAttendants();
    });
    this.socket.on('delete-Attendant', () => {
      this.getAttendants();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // this.myControl.valueChanges.subscribe((data) => {
    //   if (!this.myControl.valid) {
    //     this.filteredOptions = new Observable<string[]>();
    //   }
    // });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);

  }

// view attendants

 getAttendants(){

    this.apiService.getAttendants().subscribe((data) => {
     this.Attendant = data;
    this.options = data;
     console.log(this.Attendant);
    })

 }


 // deleting the attendant

 removeAttendant(attendant, index) {
   console.log(attendant);
   Swal.fire({
     title: 'Are you sure?',
     text: `Attendant will be deleted permanently`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true,
     preConfirm: (login) => {
       this.apiService.deleteAttendant(attendant._id).subscribe((data) => {
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
         'Attendant has been deleted.',
         'success'
       )
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'Cancelled',
         'Attendant was not deleted',
         'error'
       )
     }
   });
  
 
}

// opening the update dialog

openUpdateRef(attendant){
  this.selectedAttendant=attendant;
  const dialogRef = this.dialog.open(uploadDialogComponent,{
    data: {
      animal:this.selectedAttendant
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

  console.log(this.selectedAttendant);

}

//opening the view dialog 

openViewRef(attendant){
  this.selectedAttendant=attendant;
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
  templateUrl: 'upload-dialog2.html',
})
// tslint:disable-next-line: class-name
export class uploadDialogComponent {

 socket = io('http://localhost:3000/attendant');

 latitude: number;
 longitude: number;
 zoom: number;
 address: string;
 checkSystem=false;
 checkSms=false;
 checkEmail=false;
 selectedAttendant;




  updateForm= new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    checkSystem: new FormControl(''),
    checkSms: new FormControl(''),
    checkEmail: new FormControl('')


  })

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private apiService:AttendantApiService,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.selectedAttendant=data.animal;
      console.log(data.animal);
    ;
   }

 // tslint:disable-next-line: use-lifecycle-interface
 ngOnInit(): void {

}

 // update attendants
updateAttendant(){



    if (!this.updateForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Attendant will be updated permanently`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {

          const id=this.selectedAttendant._id;
          this.apiService.updateAttendant(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/admin/manage-attendants');
              console.log('Attendant updated successfully!');
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
            'Attendant has been updated.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Attendant was not updated',
            'error'
          )
        }
      });

        
    }


}






}