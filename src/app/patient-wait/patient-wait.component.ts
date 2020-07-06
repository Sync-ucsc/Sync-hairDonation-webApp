import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-wait',
  templateUrl: './patient-wait.component.html',
  styleUrls: ['./patient-wait.component.scss']
})
export class PatientWaitComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ismobile() {
    if ($(window).width() > 577) {
      return false;
    }
    return true;
  }

}
