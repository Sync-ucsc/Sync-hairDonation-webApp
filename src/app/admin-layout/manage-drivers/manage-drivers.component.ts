import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject } from '@angular/core';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { DriverApiService } from './../../service/driver-api.service';
import { Router } from '@angular/router';

// declare const Swal: any;
import Swal from 'sweetalert2'
// import swal from 'sweetalert';

import { Observable } from 'rxjs';
import { startWith, map, endWith } from 'rxjs/operators';
import { Driver } from 'src/app/model/driver';

export interface DialogData {
  animal:any;
}

// view and delete component

@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.scss']
})
export class ManageDriversComponent implements OnInit {

  socket = io('http://localhost:3000/driver');

  @ViewChild('dialog') templateRef: TemplateRef<any>;
   Driver:any = [];
   DriverNames:any=[];

   selectedDriver;


    myControl = new FormControl('',Validators.required);
    options:any =[];
    filteredOptions: Observable<string[]>;

  constructor(
      private apiService:DriverApiService,
      public dialog: MatDialog,
    ) {
      this.getDriver();
      this.socket.on('update-data', function(data: any) {
        this.getDriver();
      }.bind(this));
     }

    ngOnInit(): void {

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

  // view drivers

   getDriver(){

      this.apiService.getDrivers().subscribe((data) => {
       this.Driver = data;
      this.options = data;
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

    // if(window.confirm('Are you sure?')) {
    //   this.apiService.deleteDriver(driver._id).subscribe((data) => {
    //       this.Driver.splice(index, 1);
    //     }
    //   )
    // }
  }

  // opening the update dialog

  openUpdateRef(driver){
    this.selectedDriver=driver;
    const dialogRef = this.dialog.open(uploadDialog1Component,{
      data: {
        animal:this.selectedDriver
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    console.log(this.selectedDriver);

  }

  //opening the view dialog

  openViewRef(driver){
    this.selectedDriver=driver;
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  }


  // update component
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'upload-dialog1',
    templateUrl: 'upload-dialog1.html',
  })
  // tslint:disable-next-line: class-name
  export class uploadDialog1Component {

   socket = io('http://localhost:3000/driver');

   latitude: number;
   longitude: number;
   zoom: number;
   address: string;
   checkSystem=false;
   checkSms=false;
   checkEmail=false;
   selectedDriver;




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

    constructor(private apiService:DriverApiService,
      public dialog: MatDialog,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.selectedDriver=data.animal;
        console.log(data.animal);
      ;
     }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit(): void {

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

