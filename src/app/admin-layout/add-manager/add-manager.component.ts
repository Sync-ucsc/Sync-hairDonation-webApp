import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManagerApiService } from './../../service/manager-api.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {
  
 submitted=false;

  managerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', Validators.required),

  })
  

  constructor(
    private apiService:ManagerApiService,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.managerForm.value);
    this.submitted = true;

    if (!this.managerForm.valid) {
      return false;
    } else {

      this.apiService.createManager(this.managerForm.value).subscribe(
        data => {
          console.log('Manager successfully created!' + data)
          Swal.fire(
            'Done!',
            'You added a new manager!',
            'success'
          )
          this.router.navigateByUrl('/admin/view-manager');
        },
        error => {
          // Do something with error
          console.error(error);
          Swal.fire(
            'error!',
            'Adding manager failed!',
            'error'
          )
        }
      );
    }
  }
}

