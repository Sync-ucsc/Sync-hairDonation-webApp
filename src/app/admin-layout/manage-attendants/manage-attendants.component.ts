
import { AttendantApiService } from './../../service/attendant-api.service';
import { Attendant } from 'src/app/model/attendant';
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// declare const Swal: any;
import Swal from 'sweetalert2';
import io from 'socket.io-client';

// view and delete component
@Component({
  selector: 'app-manage-attendants',
  templateUrl: './manage-attendants.component.html',
  styleUrls: ['./manage-attendants.component.scss']
})

export class ManageAttendantsComponent implements OnInit,OnDestroy {
  socket;
  getAttendantsSub;
  dialogRef1Sub;
  dialogRef2Sub;
  updateAttendantSub;
  deleteAttendantSub;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
  @ViewChild('dialog2') templateRef2: TemplateRef<any>;

  Attendant:any = [];
  selectedAttendant;


  updateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),
  })

constructor(
    private apiService:AttendantApiService,
    public dialog: MatDialog,
    private router:Router,

  ) {
    this.socket = io.connect('http://127.0.0.1:3000');


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

  }

 // view attendants

 getAttendants(){

   this.getAttendantsSub = this.apiService.getAttendants().subscribe((data) => {
     this.Attendant = data['data'];
     console.log(this.Attendant);
    })

 }

 // opening the view dialog

 openViewRef(attendant){
  this.selectedAttendant=attendant;
  const dialogRef = this.dialog.open(this.templateRef);

   this.dialogRef1Sub = dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

 }

 // opening the update dialog

openUpdateRef(attendant){
  this.selectedAttendant=attendant;
  const dialogRef = this.dialog.open(this.templateRef2);

  this.dialogRef2Sub = dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}

 // updating the attendant

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

        const id = this.selectedAttendant._id;
        this.updateAttendantSub = this.apiService.updateAttendant(id, this.updateForm.value)
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
       this.deleteAttendantSub =this.apiService.deleteAttendant(attendant._id).subscribe((data) => {
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

  ngOnDestroy(){
    if (this.getAttendantsSub !== undefined) {
      this.getAttendantsSub.unsubscribe();
    }
    if (this.dialogRef1Sub !== undefined) {
      this.dialogRef1Sub.unsubscribe();
    }
    if (this.dialogRef2Sub !== undefined) {
      this.dialogRef2Sub.unsubscribe();
    }
    if (this.updateAttendantSub !== undefined) {
      this.updateAttendantSub.unsubscribe();
    }
    if (this.deleteAttendantSub !== undefined) {
      this.deleteAttendantSub.unsubscribe();
    }
  }


}



