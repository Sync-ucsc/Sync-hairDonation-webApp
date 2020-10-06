import { AttendantApiService } from '../../service/attendant-api.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})


export class AttendantsComponent implements OnInit,OnDestroy {
  submitted=false;

  attendantForm= new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    address: new FormControl('', Validators.required),

  })
  @ViewChild('search')
  public searchElementRef: ElementRef;
  createAttendantSub

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

     this.createAttendantSub = this.apiService.createAttendant(this.attendantForm.value).subscribe(
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

  ngOnDestroy() {
    if (this.createAttendantSub !== undefined) {
      this.createAttendantSub.unsubscribe();
    }
  }
}
