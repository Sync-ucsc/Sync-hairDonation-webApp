import { Component, OnInit } from '@angular/core';
declare const getFingerprint: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { 
    console.log(getFingerprint());
  }

  ngOnInit(): void {
  }

}
