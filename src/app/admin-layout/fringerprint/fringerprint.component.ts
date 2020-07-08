import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FingerprintService } from '@services/fingerprint.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { data } from 'jquery';

export interface PeriodicElement {
  massage: string;
  role: string;
  weight: number;
  validDate: string;
  delete: boolean;
}


@Component({
  selector: 'app-fringerprint',
  templateUrl: './fringerprint.component.html',
  styleUrls: ['./fringerprint.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FringerprintComponent implements OnInit {

  donor = false;
  patient = false;

  manager = false;
  status = 'sall';
  displayedColumns: string[] = ['fingerprint', 'check', 'action'];
  tdata;
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private fingerprint: FingerprintService) {
    this.getAll();
  }

  ngOnInit(): void {
    
  }

  getAll(){
    this.fingerprint.getAll().subscribe(
      data => {
        console.log(data)
        this.tdata = data.data
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataFilter(x) {
    let data = [];
    console.log(x)
    if (x === 'donor') {
      this.donor = !this.donor;
    }
    if (x === 'patient') {
      this.patient = !this.patient;
    }
    if (x === 'sall'|| x === 'sblock' || x === 'sunblock') {
      this.status = x;
    }
    if (this.donor === true || this.patient === true || x === 'sall' || x === 'sblock' || x === 'sunblock') {
      console.log(this.tdata)
      this.tdata.forEach(e => {

        if (this.status === 'sblock' && e.check !== true) {

          if (e.userType.indexOf('donor') !== -1  && this.donor === true) {
            data.push(e)
          }
          else if (e.userType.indexOf('patient') !== -1 && this.patient === true) {
            data.push(e)
          }
          if (this.donor !== true && this.patient !== true) {
            data.push(e)
          }


        } else if (this.status === 'sunblock' && e.check === true) {

          if (e.userType.indexOf('donor') !== -1 && this.donor === true) {
            data.push(e)
          }
          else if (e.userType.indexOf('patient') !== -1 && this.patient === true) {
            data.push(e)
          }
          if (this.donor !== true && this.patient !== true) {
            data.push(e)
          }

        } else if (this.status === 'sall') {
          if (e.userType.indexOf('donor') !== -1 && this.donor === true) {
            data.push(e)
          }
          else if (e.userType.indexOf('patient') !== -1 && this.patient === true) {
            data.push(e)
          }
          if (this.donor !== true && this.patient !== true) {
            data.push(e)
          }


        }
      })
    } else {
      data = this.tdata;
    }

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  filterItemsOfType(data){
    if (this.donor === true && this.patient === false){
      return data.filter(x => x.userType === 'donor');
    } else if (this.donor === false && this.patient === true){
      return data.filter(x => x.userType === 'patient');
    } else {
      return data;
    }
  }


  checkFingerprint(fingerprint,x){
    console.log(fingerprint,!x)
    this.fingerprint.cecked(fingerprint, !x).subscribe(
      data => {
        console.log(data);
        this.tdata.forEach((e)=>{
          if (e.Fingerprint === fingerprint){
            e.check = !x
          }
        });
        console.log(this.tdata);
      },
      error => {
        console.log(error);
        this.getAll();
      }
    )
  }

}
