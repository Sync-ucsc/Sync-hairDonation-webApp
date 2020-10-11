import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// material
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
// services
import {TargetService} from '@services/target.service';
// models
import {BackendResponse} from '@model/backendResponse';
import {AllSalonNeedToDelivers} from '@model/Response/allSalonNeedToDelivers';
// Modal
import {AssignDriverComponent} from './assign-driver/assign-driver.component';


@Component({
  selector: 'app-manage-salon-request',
  templateUrl: './manage-salon-request.component.html',
  styleUrls: ['./manage-salon-request.component.scss']
})
export class ManageSalonRequestComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['salonName', 'wigCount', 'createdAt', 'status', 'assign'];
  dataSource: MatTableDataSource<AllSalonNeedToDelivers>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showTable = false;
  dialogRefSub


  constructor(private _targetService: TargetService,
              public dialog: MatDialog) {

  }

  async ngOnInit(): Promise<any> {
   await this.buildTable()
  }

  async buildTable(){
    const response = await this.fetchData()
    this.showTable = true;
    console.log(response)
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async fetchData(): Promise<AllSalonNeedToDelivers[] | null> {
    try {

      const response = await this._targetService
        .getAllSalonNeedToDelivers().toPromise() as BackendResponse

      if (!response.success) throw new Error(`failed to get`);

      return response.data as AllSalonNeedToDelivers[];

    } catch (error) {
      console.log(`error`)
      console.log(error)
      return null
    }
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assignToDriver(row) {

    const dialogRef = this.dialog.open(AssignDriverComponent, {
      data: {salonDetails: row},
      panelClass: 'full-width-dialog'
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      await this.buildTable()
    });
    console.log(`call assign`)
  }

  ngOnDestroy() {
    if (this.dialogRefSub !== undefined) {
      this.dialogRefSub.unsubscribe();
    }
  }
}
