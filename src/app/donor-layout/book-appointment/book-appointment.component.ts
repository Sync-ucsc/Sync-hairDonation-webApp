import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {



  ngOnInit(): void {
  }

  // book(){

  // }
  // book= function () {
  //    this.router.navigateByUrl('/book_appointment/appointment_details')
  // }

  constructor(private route: Router) {}
  public book()
  {
   this.route.navigate(['/donor/appointment_details']);
  }
}


