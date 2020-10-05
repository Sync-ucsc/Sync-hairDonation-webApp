import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '@services/notification.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  massage: string;
  role: string;
  icon: string;
  validDate: string;
  notificationStatus: String;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { role: 'all', massage: 'Collect wigs from Salon', weight: 1.0079, validDate: '2020.06.16', delete: true},
//   { role: 'donor', massage: 'Collect wigs from Salon', weight: 4.0026, validDate: '2020.06.16', delete: false},
//   { role: 'patient', massage: 'Collect wigs from Salon', weight: 6.941, validDate: '2020.06.16', delete: false },
//   { role: 'salon', massage: 'Collect wigs from Salon', weight: 9.0122, validDate: '2020.06.16', delete: false},
//   { role: 'manager', massage: 'Collect wigs from Salon', weight: 10.811, validDate: '2020.06.16', delete: false },
//   { role: 'attendant', massage: 'Collect wigs from Salon', weight: 12.0107, validDate: '2020.06.16', delete: true },
//   { role: 'driver', massage: 'Collect wigs from Salon', weight: 14.0067, validDate: '2020.06.16', delete: false },
//   { role: 'all', massage: 'Collect wigs from Salon', weight: 15.9994, validDate: '2020.06.16', delete: false},
//   { role: 'manager', massage: 'Collect wigs from Salon', weight: 18.9984, validDate: '2020.06.16', delete: true },
//   { role: 'donor', massage: 'Collect wigs from Salon', weight: 20.1797, validDate: '2020.06.16', delete: false },
//   { role: 'all', massage: 'Collect wigs from Salon', weight: 20.1797, validDate: '2020.06.16', delete: false},
// ];
@Component({
  selector: 'app-manage-notification',
  templateUrl: './manage-notification.component.html',
  styleUrls: ['./manage-notification.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageNotificationComponent implements OnInit{

  all = false;
  donor = false;
  patient = false;
  salon = false;
  driver = false;
  attendant = false;
  manager = false;
  status = 'sall'
  displayedColumns: string[] = ['massage', 'role', 'notificationStatus', 'validDate','action'];
  displayedColumns1: string[] = ['massage', 'action'];
  ELEMENT_DATA: any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // console.log(this.paginator);
     this.dataFilter(' ');

  }

  constructor(private notificationService: NotificationService) { 
    this.notificationService.getAllNotification().subscribe(
      data => {
        this.ELEMENT_DATA = data['data'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>{}
    )
  }


  sExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ismobile() {
    if ($(window).width() > 577) {
      return false;
    }
    return true;
  }

  dataFilter(x){
    let data =[];
    console.log(x)
    if(x === 'all'){
      this.all = !this.all;
    }
    if (x === 'donor') {
      this.donor = !this.donor;
    }
    if (x === 'patient') {
      this.patient = !this.patient;
    }
    if (x === 'salon') {
      this.salon = !this.salon;
    }
    if (x === 'driver') {
      this.driver = !this.driver;
    }
    if (x === 'attendant') {
      this.attendant = !this.attendant;
    }
    if (x === 'manager') {
      this.manager = !this.manager;
    }
    if (x === 'sall' || x === 'sdelete' || x === 'sexpire' || x === 'ssend'){
      this.status = x;
      console.log(x)
    }
    if (this.all === true || this.donor === true || this.patient === true || this.salon === true || this.driver === true
      || this.attendant === true || this.manager === true || x === 'sall' || x === 'sdelete' || x === 'sexpire' || x === 'ssend'){
      console.log(x)
      this.ELEMENT_DATA.forEach(e => {
        
        if (this.status === 'sdelete' && e.notificationStatus === '2'){

          if (e.role === 'all' && this.all === true) {
            data.push(e)
          }
          if (e.role === 'donor' && this.donor === true) {
            data.push(e)
          }
          if (e.role === 'patient' && this.patient === true) {
            data.push(e)
          }
          if (e.role === 'salon' && this.salon === true) {
            data.push(e)
          }
          if (e.role === 'driver' && this.driver === true) {
            data.push(e)
          }
          if (e.role === 'attendant' && this.attendant === true) {
            data.push(e)
          }
          if (e.role === 'manager' && this.manager === true) {
            data.push(e)
          }
          if (this.all !== true && this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true){
            data.push(e)
            console.log(x)
          }


        } else if (this.status === 'sexpire' && e.notificationStatus !== '2' && this.calculateDiff(e.validDate) <= 0 ) {
          
          if (e.role === 'all' && this.all === true) {
            data.push(e)
          }
          if (e.role === 'donor' && this.donor === true) {
            data.push(e)
          }
          if (e.role === 'patient' && this.patient === true) {
            data.push(e)
          }
          if (e.role === 'salon' && this.salon === true) {
            data.push(e)
          }
          if (e.role === 'driver' && this.driver === true) {
            data.push(e)
          }
          if (e.role === 'attendant' && this.attendant === true) {
            data.push(e)
          }
          if (e.role === 'manager' && this.manager === true) {
            data.push(e)
          }

          if (this.all !== true && this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
            data.push(e)
          }


        } else if (this.status === 'ssend' && e.notificationStatus !== '2' && this.calculateDiff(e.validDate) >= 0  ) {

          if (e.role === 'all' && this.all === true) {
            data.push(e)
          }
          if (e.role === 'donor' && this.donor === true) {
            data.push(e)
          }
          if (e.role === 'patient' && this.patient === true) {
            data.push(e)
          }
          if (e.role === 'salon' && this.salon === true) {
            data.push(e)
          }
          if (e.role === 'driver' && this.driver === true) {
            data.push(e)
          }
          if (e.role === 'attendant' && this.attendant === true) {
            data.push(e)
          }
          if (e.role === 'manager' && this.manager === true) {
            data.push(e)
          }
          if (this.all !== true && this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
            data.push(e)
          }

        } else if (this.status === 'sall') {
          if (e.role === 'all' && this.all === true) {
            data.push(e)
          }
          if (e.role === 'donor' && this.donor === true) {
            data.push(e)
          }
          if (e.role === 'patient' && this.patient === true) {
            data.push(e)
          }
          if (e.role === 'salon' && this.salon === true) {
            data.push(e)
          }
          if (e.role === 'driver' && this.driver === true) {
            data.push(e)
          }
          if (e.role === 'attendant' && this.attendant === true) {
            data.push(e)
          }
          if (e.role === 'manager' && this.manager === true) {
            data.push(e)
          }
          if (this.all !== true && this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
            data.push(e)
          }


        }
      })
    } else {
      data = this.ELEMENT_DATA;
    }

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteNotification(data){
    this.notificationService.deleteNotification(data).subscribe(
      data => {
        Swal.fire(
          'Notification Delete!',
          data['msg'],
          'success'
        );
        this.ELEMENT_DATA = data['data'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )
  }

  repush(data){
    this.notificationService.repush(data).subscribe(
      data => {
        Swal.fire(
          'Notification Repush!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )
  }

  calculateDiff(date) {
    let validDate = new Date(date);
    let currentDate = new Date();

    return Math.floor((Date.UTC(validDate.getFullYear(), validDate.getMonth(), validDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

}
