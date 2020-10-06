import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject, OnDestroy } from '@angular/core';
import {Router } from '@angular/router';
import { SalonApiService } from './../../service/salon-api.service';
import {DonorApiService} from './../../service/donor-api.service';
import { TokenService } from './../../service/token.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit ,OnDestroy {
  socket = io('http://localhost:3000/donor');
  email:string;
  Donor:any[];
  selectedDonor;
  getDonorByEmailSub;


  constructor(
    private route: Router,
    private apiService: DonorApiService,
    private salonService: SalonApiService,
    private tokenService: TokenService
    )

    {}
  ngOnInit(): void {
    this.getDonor();
    this.socket.on('new-donor',() =>{
      this.getDonor();
    });
    // this.socket.on('accepted-salon',()=>{
    //   this.getDonors();
    // });
    // this.socket.on('decline-salon',()=>{
    //   this.getDonors();

    // });


    // console.log(selectedSalon)

  }

  getDonor(){

    this.email=this.tokenService.getEmail();
    console.log(this.email);

    this.getDonorByEmailSub = this.apiService.getDonorByEmail(this.email).subscribe((data)=>{
      this.selectedDonor=data['data'];

    // this.getSalonsSub = this.apiService.getDonorById().subscribe((data) => {
    // this.Donor = data["data"];
    // this.options = data["data"];
     console.log(this.selectedDonor);
    })
    
 }





  // book(){

  // }
  // book= function () {
  //    this.router.navigateByUrl('/book_appointment/appointment_details')
  // }


  public book()
  {
   this.route.navigate(['/donor/appointment_details']);
  }



  ngOnDestroy() {
    // if (this.declineSalonSub !== undefined) {
    //   this.declineSalonSub.unsubscribe();
    // }
    // if (this.acceptedSalonSub !== undefined) {
    //   this.acceptedSalonSub.unsubscribe();
    // }
    if (this.getDonorByEmailSub !== undefined) {
      this.getDonorByEmailSub.unsubscribe();
    }


  }
}


