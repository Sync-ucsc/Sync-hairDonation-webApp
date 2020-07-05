import { Component, OnInit, ViewChild, TemplateRef,ElementRef, Inject } from '@angular/core';
import { MatDialog,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { DriverApiService } from './../../service/driver-api.service';
import { Router } from '@angular/router';

import io from 'socket.io-client';
import Swal from 'sweetalert2'

// view and delete component

@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.scss']
})
export class ManageDriversComponent implements OnInit {

  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
  @ViewChild('dialog2') templateRef2: TemplateRef<any>;

   Driver:any = [];
   selectedDriver;


   updateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),

  })
  constructor(
      private apiService:DriverApiService,
      public dialog: MatDialog,
      private router:Router,

    ) {
      this.socket = io.connect('http://localhost:3000');
     }

     ngOnInit(): void {
      this.getDrivers();
      this.socket.on('new-driver', () => {
        this.getDrivers();
      });
      this.socket.on('update-driver', () => {
        this.getDrivers();
      });
      this.socket.on('delete-driver', () => {
        this.getDrivers();
      });
    }

  // view drivers

   getDrivers(){

      this.apiService.getDrivers().subscribe((data) => {
       this.Driver = data['data'];

       console.log(this.Driver);
      })

   }


   // deleting the driver

   removeDriver(driver, index) {
     console.log(driver);
     Swal.fire({
       title: 'Are you sure?',
       text: `Driver will be removed permanently`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       reverseButtons: true,
       preConfirm: (login) => {
         this.apiService.deleteDriver(driver._id).subscribe((data) => {
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
           'Driver has been removed.',
           'success'
         )
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Driver was not removed',
           'error'
         )
       }
     });

  }

  // opening the update dialog

  openUpdateRef(driver){
    this.selectedDriver=driver;
    const dialogRef = this.dialog.open(this.templateRef2);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });


  }

  // opening the view dialog

  openViewRef(driver){
    this.selectedDriver=driver;
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

   // update drivers
  updateDriver(){
      if (!this.updateForm.valid) {
        return false;
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: `Driver details will be updated permanently`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          preConfirm: (login) => {

            const id=this.selectedDriver._id;
            this.apiService.updateDriver(id, this.updateForm.value)
              .subscribe(res => {
                this.router.navigateByUrl('/admin/manage-drivers');
                console.log('Driver details updated successfully!');
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
              'Driver details has been updated.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Driver details was not updated',
              'error'
            )
          }
        });


      }


  }



}

