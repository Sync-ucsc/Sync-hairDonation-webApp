import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
  massage: string;
  role: string;
  weight: number;
  validDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { role: 'all', massage: 'collect wigs', weight: 1.0079, validDate: '2020.06.16' },
  { role: 'donor', massage: 'collect wigs', weight: 4.0026, validDate: '2020.06.16' },
  { role: 'patient', massage: 'collect wigs', weight: 6.941, validDate: '2020.06.16' },
  { role: 'salon', massage: 'collect wigs', weight: 9.0122, validDate: '2020.06.16' },
  { role: 'manager', massage: 'collect wigs', weight: 10.811, validDate: '2020.06.16' },
  { role: 'attendat', massage: 'collect wigs', weight: 12.0107, validDate: '2020.06.16' },
  { role: 'driver', massage: 'collect wigs', weight: 14.0067, validDate: '2020.06.16' },
  { role: 'all', massage: 'collect wigs', weight: 15.9994, validDate: '2020.06.16' },
  { role: 'manager', massage: 'collect wigs', weight: 18.9984, validDate: '2020.06.16' },
  { role: 'donor', massage: 'collect wigs', weight: 20.1797, validDate: '2020.06.16' },
  { role: 'all', massage: 'collect wigs', weight: 20.1797, validDate: '2020.06.16' },
];
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
export class ManageNotificationComponent implements OnInit {

  all = false;
  displayedColumns: string[] = ['massage', 'role', 'weight', 'validDate','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
    // this.dataFilter();
  
  }

  constructor() { }

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

  dataFilter(){
    let data =[];
    console.log(this.all)
    if(this.all =true){
      ELEMENT_DATA.forEach(e => {
        if (e.role == 'all' && this.all == true) {
          data.push(e)
        }
      })
    } else {
      data = ELEMENT_DATA;
    }
    
    this.dataSource = new MatTableDataSource(data);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
