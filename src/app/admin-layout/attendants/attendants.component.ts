
import { AttendantApiService } from '../../service/attendant-api.service';
import * as io from 'socket.io-client';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})


export class AttendantsComponent implements OnInit {
  submitted=false;

  attendantForm= new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    address: new FormControl('', Validators.required),

  })
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private apiService: AttendantApiService
  ) { }
  ngOnInit(): void {
  }

 onSubmit(){
   console.log(this.attendantForm.value);
   this.submitted=true;

   if (!this.attendantForm.valid) {
    return false;
  } else {

    this.apiService.createAttendant(this.attendantForm.value).subscribe(
      data => {
        console.log(' successfully added!' + data)
        Swal.fire(
          'Done!',
          'You added a new attendant!',
          'success'
        )
        this.router.navigateByUrl('/admin/manage-attendants');
      },

      error => {
        // Do something with error
        console.error(error);
        Swal.fire(
          'error!',
          'Adding attendant failed!',
          'error'
        )
      }
    );
 }

}
}
