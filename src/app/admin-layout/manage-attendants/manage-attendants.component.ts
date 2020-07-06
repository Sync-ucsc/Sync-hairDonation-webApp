
import { AttendantApiService } from './../../service/attendant-api.service';
import { Attendant } from 'src/app/model/attendant';
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// declare const Swal: any;
import Swal from 'sweetalert2';
import io from 'socket.io-client';

 // import { Observable } from 'rxjs';


@Component({
  selector: 'app-manage-attendants',
  templateUrl: './manage-attendants.component.html',
  styleUrls: ['./manage-attendants.component.scss']
})

export class ManageAttendantsComponent implements OnInit {
  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
  @ViewChild('dialog2') templateRef2: TemplateRef<any>;

  Attendant:any = [];
  AttendantNames:any=[];
  selectedAttendant;


  updateForm = new FormGroup({
    fstName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),
  })

constructor(
    private apiService:AttendantApiService,
    public dialog: MatDialog,
    private router:Router,

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

  }

// view attendants

 getAttendants(){

    this.apiService.getAttendants().subscribe((data) => {
     this.Attendant = data['data'];
     console.log(this.Attendant);
    })

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
  const dialogRef = this.dialog.open(this.templateRef2);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}

// opening the view dialog

openViewRef(attendant){
  this.selectedAttendant=attendant;
  const dialogRef = this.dialog.open(this.templateRef);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}


}



