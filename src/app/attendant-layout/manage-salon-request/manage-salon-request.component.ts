import {Component, OnInit, ViewChild} from '@angular/core';
// material
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
// services
import {TargetService} from '@services/target.service';
// models
import {BackendResponse} from '@model/backendResponse';
import {AllSalonNeedToDelivers} from '@model/Response/allSalonNeedToDelivers';



@Component({
  selector: 'app-manage-salon-request',
  templateUrl: './manage-salon-request.component.html',
  styleUrls: ['./manage-salon-request.component.scss']
})
export class ManageSalonRequestComponent implements OnInit {

  displayedColumns: string[] = ['salonName', 'address' , 'createdAt' , 'status'];
  dataSource: MatTableDataSource<AllSalonNeedToDelivers>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showTable = false;

  constructor(private _targetService: TargetService) {

  }

  async ngOnInit(): Promise<any> {
    const response = await this.fetchData()
    this.showTable = true;
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async fetchData(): Promise<AllSalonNeedToDelivers[] | null>{
    try{

      const response = await this._targetService
        .getAllSalonNeedToDelivers().toPromise() as BackendResponse

      if(!response.success) throw new Error(`failed to get`);

      return response.data as AllSalonNeedToDelivers[];

    }catch (error) {
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
}
