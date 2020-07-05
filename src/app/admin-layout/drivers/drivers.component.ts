import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DriverApiService } from './../../service/driver-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  submitted=false;

  driverForm= new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telephone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    address:new FormControl(''),

  })
  @ViewChild('search')
  public searchElementRef : ElementRef;

  constructor(
    private router: Router,
    private apiService: DriverApiService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.driverForm.value);
    this.submitted = true;

    if (!this.driverForm.valid) {
      return false;
    } else {

      this.apiService.createDriver(this.driverForm.value).subscribe(
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

}
