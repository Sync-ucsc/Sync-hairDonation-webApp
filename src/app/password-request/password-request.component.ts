import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss']
})
export class PasswordRequestComponent implements OnInit,OnDestroy {

  email:'';
  sendPasswordResetLinkSub;
  requestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data ={
      email: this.email
    }
    this.sendPasswordResetLinkSub = this.userService.sendPasswordResetLink(data).subscribe(
      data => {
        console.log(data)
        if (data['success'] === true) {
          Swal.fire(
            'Email send!',
            'Check your Email!',
            'success'
          );
          this.router.navigate(['/login']);
        } else {
          Swal.fire(
            'Invalid!',
            'Try again!',
            'error'
          );
        }
      },
      error => {
        Swal.fire(
          'Invalid!',
          'Try again!',
          'error'
        );
      }
    )
  }

  ngOnDestroy(){
    if (this.sendPasswordResetLinkSub !== undefined) {
      this.sendPasswordResetLinkSub.unsubscribe();
    }
  }

}
