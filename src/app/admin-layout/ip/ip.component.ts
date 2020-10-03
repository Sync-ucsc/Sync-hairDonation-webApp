import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IpService } from '@services/ip.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '@services/user.service';
import io from 'socket.io-client';

export interface PeriodicElement {
  massage: string;
  role: string;
  weight: number;
  validDate: string;
  delete: boolean;
}


@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit,OnDestroy {

  all = false;
  donor = false;
  patient = false;
  salon = false;
  driver = false;
  attendant = false;
  manager = false;
  status = 'sall';
  displayedColumns: string[] = ['ip', 'country','region','notsecure','acounts'];
  dataSource;
  tdata;
  socket;
  rel;
  ipGetAllSub;
  temporarydisableSub;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private ipService: IpService,private userService: UserService) {
    this.getAll();
    this.socket = io.connect('http://127.0.0.1:3000');
   }


  getAll() {
    this.ipGetAllSub = this.ipService.getAll().subscribe(
      data => {
        console.log(data)
        data.data.forEach(e => {
          let y = '';
          e.users.forEach(g => { y = y + g.email + ','; });
          e.emails = y;
        });
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


  ngOnInit(): void {
    this.socket.on('check-user', () => {
      if(this.rel){
        this.getAll();
      }
      this.rel = true;
    });
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
    if (x === 'sall' || x === 'stempory' ||  x === 'sunblock') {
      this.status = x;
      console.log(x)
    }
    if (this.all === true || this.donor === true || this.patient === true || this.salon === true || this.driver === true
      || this.attendant === true || this.manager === true || x === 'sall' || x === 'stempory' ||  x === 'sunblock') {
      console.log(x)
      this.tdata.forEach(e => {

        if (this.status === 'stempory' && this.checkBan(e)  === true) {

          if (e.userType.indexOf('donor') !== -1 && this.donor === true) {
            data.push(e)
          }
          if (e.userType.indexOf('patient') !== -1 && this.patient === true) {
            data.push(e)
          }
          if (e.userType.indexOf('salon') !== -1 && this.salon === true) {
            data.push(e)
          }
          if (e.userType.indexOf('driver') !== -1 && this.driver === true) {
            data.push(e)
          }
          if (e.userType.indexOf('attendant') !== -1 && this.attendant === true) {
            data.push(e)
          }
          if (e.userType.indexOf('manager') !== -1 && this.manager === true) {
            data.push(e)
          }
          if (this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
            data.push(e)
          }


        } else if (this.status === 'sunblock' && this.checkBan(e)   !== true) {

          if (e.userType.indexOf('donor') !== -1 && this.donor === true) {
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
          if (this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
            data.push(e)
          }

        } else if (this.status === 'sall') {

          if (e.userType.indexOf('donor') !== -1 && this.donor === true) {
            data.push(e)
          }
          if (e.userType.indexOf('patient') !== -1 && this.patient === true) {
            data.push(e)
          }
          if (e.userType.indexOf('salon') !== -1 && this.salon === true) {
            data.push(e)
          }
          if (e.userType.indexOf('driver') !== -1 && this.driver === true) {
            data.push(e)
          }
          if (e.userType.indexOf('attendant') !== -1 && this.attendant === true) {
            data.push(e)
          }
          if (e.userType.indexOf('manager') !== -1 && this.manager === true) {
            data.push(e)
          }
          if (this.donor !== true && this.patient !== true && this.salon !== true && this.driver !== true
            && this.attendant !== true && this.manager !== true) {
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


  filterItemsOfType(data) {
    if (this.all === true || this.donor === true || this.patient === true || this.salon === true || this.driver === true
      || this.attendant === true || this.manager === true) {
      return data.filter(x => (
        (x.userType === 'donor' && this.donor === true) ||
        (x.userType === 'patient' && this.patient === true) ||
        (x.userType === 'salon' && this.salon === true) ||
        (x.userType === 'driver' && this.driver === true) ||
        (x.userType === 'attendant' && this.attendant === true) ||
        (x.userType === 'manager' && this.manager === true)
      ));
      } else {
        return data;
      }
  }


  checkEmail(email, x) {
    let data = {
      email: email,
      val: !x
    }
    this.rel = false;
    this.temporarydisableSub =this.userService.temporarydisable(data).subscribe(
      data => {
        this.tdata.forEach((e) => {
          e.users.forEach((el) => {
            if(el.email == email){
              el.temporyBan = !x;
            }
          })
        });
        console.log(this.tdata);
      },
      error => {
        console.log(error);
        this.getAll();
      }
    )
  }

  checkBan(x){
    let y =false;
    x.users.forEach(e=>{
      if (e.temporyBan === true){
        y = true;
      }
    })

    return y;
  }
  
  ngOnDestroy(){
    if (this.ipGetAllSub !== undefined) {
      this.ipGetAllSub.unsubscribe();
    }
    if (this.temporarydisableSub !== undefined) {
      this.temporarydisableSub.unsubscribe();
    }
  }

}
