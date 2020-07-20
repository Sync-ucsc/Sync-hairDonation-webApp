import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {ManagerApiService} from './../../service/manager-api.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-manager',
  templateUrl: './view-manager.component.html',
  styleUrls: ['./view-manager.component.scss']
})
export class ViewManagerComponent implements OnInit {
  socket;
  @ViewChild('dialog') templateRef: TemplateRef<any>;
  @ViewChild('dialog2') templateRef2: TemplateRef<any>;

  Manager: any = [];
  selectedManager;


  updateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),
  
  })

  constructor(
    private apiService:ManagerApiService,
    public dialog: MatDialog,
    private router:Router,
  ) {
    this.socket = io.connect('http://127.0.0.1:3000');
   }

  ngOnInit(): void {
    this.getManagers();
    this.socket.on('new-manager', () => {
      this.getManagers();
    });
    this.socket.on('update-manager', () => {
      this.getManagers();
    });
    this.socket.on('delete-manager', () => {
      this.getManagers();
    });
  }

  // view managers

  getManagers() {

    this.apiService.getManagers().subscribe((data) => {
      this.Manager = data["data"];
     
      console.log(this.Manager);
    })

  }

  //opening the view dialog
  openViewRef(manager){
    this.selectedManager = manager;
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //opening the update dialog
  openUpdateRef(manager){
    this.selectedManager = manager;
    const dialogRef = this.dialog.open(this.templateRef2);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
   

  //updating the manager

  updateManager(){
    if (!this.updateForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Manager will be updated permanently`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {

          const id = this.selectedManager._id;
          this.apiService.updateManager(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/admin/view-manager');
              console.log('Manager updated successfully!');
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
            'Manager has been updated.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Manager was not updated',
            'error'
          )
        }
      });


  }

  }
  //deleting a manager

  removeManager(manager,index){
    console.log(manager);
    Swal.fire({
      title: 'Are you sure?',
      text: `Manager will be deleted permanently`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      preConfirm: (login) => {
        this.apiService.deleteManager(manager._id).subscribe((data) => {
          console.log(data);
          this.socket.emit('updatedata', data);
          if (!data.msg)
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
          'Manager has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Manager was not deleted',
          'error'
        )
      }
    });

  }
}
