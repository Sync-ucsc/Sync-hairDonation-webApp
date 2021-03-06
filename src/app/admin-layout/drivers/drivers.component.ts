import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DriverApiService} from '@services/driver-api.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit,OnDestroy {

  submitted = false;
  createDriverSub


  driverForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),

  })

  constructor(
    private router: Router,
    private apiService: DriverApiService
  ) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.driverForm.value);
    this.submitted = true;

    if (!this.driverForm.valid) {
      return false;
    } else {

      this.createDriverSub = this.apiService.createDriver(this.driverForm.value).subscribe(
        data => {
          console.log('Driver successfully created!' + data)
          Swal.fire(
            'Done!',
            'You added a new driver!',
            'success'
          )
          this.router.navigateByUrl('/admin/manage-drivers');
        },
        error => {
          // Do something with error
          console.error(error);
          Swal.fire(
            'error!',
            'Adding driver failed!',
            'error'
          )
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.createDriverSub !== undefined) {
      this.createDriverSub.unsubscribe();
    }
  }

}
