import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FingerprintService } from '@services/fingerprint.service';
import { UserService } from '@services/user.service';

export interface PeriodicElement {
  massage: string;
  role: string;
  weight: number;
  validDate: string;
  delete: boolean;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { role: 'all', massage: 'Collect wigs from Salon', weight: 1.0079, validDate: '2020.06.16', delete: true },
  { role: 'donor', massage: 'Collect wigs from Salon', weight: 4.0026, validDate: '2020.06.16', delete: false },
  { role: 'patient', massage: 'Collect wigs from Salon', weight: 6.941, validDate: '2020.06.16', delete: false },
  { role: 'salon', massage: 'Collect wigs from Salon', weight: 9.0122, validDate: '2020.06.16', delete: false },
  { role: 'manager', massage: 'Collect wigs from Salon', weight: 10.811, validDate: '2020.06.16', delete: false },
  { role: 'attendant', massage: 'Collect wigs from Salon', weight: 12.0107, validDate: '2020.06.16', delete: true },
  { role: 'driver', massage: 'Collect wigs from Salon', weight: 14.0067, validDate: '2020.06.16', delete: false },
  { role: 'all', massage: 'Collect wigs from Salon', weight: 15.9994, validDate: '2020.06.16', delete: false },
  { role: 'manager', massage: 'Collect wigs from Salon', weight: 18.9984, validDate: '2020.06.16', delete: true },
  { role: 'donor', massage: 'Collect wigs from Salon', weight: 20.1797, validDate: '2020.06.16', delete: false },
  { role: 'all', massage: 'Collect wigs from Salon', weight: 20.1797, validDate: '2020.06.16', delete: false },
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserComponent implements OnInit {

  all = false;
  donor = false;
  patient = false;
  salon = false;
  driver = false;
  attendant = false;
  manager = false;
  status = 'sall';
  displayedColumns: string[] = ['index','email', 'role','active', 'action'];

  dataSource;

  tdata;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService) {
    this.getAll();
  }

  ngOnInit(): void {

  }

  getAll() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data)
        this.tdata = data['data']
        this.dataSource = new MatTableDataSource(data['data']);
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
    if (x === 'all') {
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
    if (x === 'sall' || x === 'stempory' || x === 'sunblock') {
      this.status = x;
      console.log(x)
    }
    if (this.all === true || this.donor === true || this.patient === true || this.salon === true || this.driver === true
      || this.attendant === true || this.manager === true || x === 'sall' || x === 'stempory' || x === 'sunblock') {
      console.log(x)
      this.tdata.forEach(e => {

        if (this.status === 'stempory' && e.temporyBan === true) {

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
            console.log(x)
          }


        } else if (this.status === 'sunblock' && e.temporyBan !== true) {

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
      data = ELEMENT_DATA;
    }

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource)
  }


  filterItemsOfType(data) {
    if (this.donor === true && this.patient === false) {
      return data.filter(x => x.userType === 'donor');
    } else if (this.donor === false && this.patient === true) {
      return data.filter(x => x.userType === 'patient');
    } else {
      return data;
    }
  }


  checkFingerprint(fingerprint, x) {
    console.log(fingerprint, !x)
    // this.fingerprint.cecked(fingerprint, !x).subscribe(
    //   data => {
    //     console.log(data);
    //     this.tdata.forEach((e) => {
    //       if (e.Fingerprint === fingerprint) {
    //         e.check = !x
    //       }
    //     });
    //     console.log(this.tdata);
    //   },
    //   error => {
    //     console.log(error);
    //     this.getAll();
    //   }
    // )
  }
}
