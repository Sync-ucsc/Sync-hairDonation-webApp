import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
// services
import {TargetService} from '@services/target.service';
// interfaces
import {BackendResponse} from '@model/backendResponse';
import {Targets} from '@model/database/dbTargets';
// Sweet alert
import sweetAlert from 'sweetalert2'

@Component({
  selector: 'app-salon-location',
  templateUrl: './salon-location.component.html',
  styleUrls: ['./salon-location.component.scss']
})
export class SalonLocationComponent implements OnInit {

  displayedColumns: string[] = ['createdAt', 'status'];
  dataSource: MatTableDataSource<Targets>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  needToDelivers: Targets[] | null = []
  salonId: string;

  constructor(private _targetService: TargetService) {

  }

  async ngOnInit() {
    this.salonId = this._targetService.salonId;
    await this.getSalonNeedToDelivers();
    // assign need to delivers to dataSource


  }

  /**
   * get salon all need to delivers by salonId
   */
  async getSalonNeedToDelivers(): Promise<any> {
    try {
      const salonId = this._targetService.salonId;

      const response = await this._targetService
        .getSalonNeedToDeliver(salonId).toPromise() as BackendResponse;

      if (!response.success) throw new Error(response.debugMessage);

      this.needToDelivers = response.data as Targets[] || null;

      this.dataSource = new MatTableDataSource(this.needToDelivers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } catch (error) {
      console.log(error)
    }

  }

  /**
   *  add new delivery request for the salon
   */
  async addNewNeedToDeliver(): Promise<void> {
    try {

      const previousRequestNotDelivered = this.needToDelivers[0].status === `NeedToDeliver`

      if (previousRequestNotDelivered) {
        await sweetAlert.fire({
          icon: 'error',
          text: 'Your previous request is still processing!',
        });
        return;
      }

      const confirm = await sweetAlert.fire({
        title: 'Are you sure?',
        text: 'You want to add new delivery request',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add request!'
      })

      if (confirm.value) {

        const response = await this._targetService
          .addNewNeedToDeliverToTheSalon(this.salonId).toPromise() as BackendResponse;

        if (!response.success) throw new Error(response.debugMessage)

        await sweetAlert.fire(
          'Added!',
          'Your request has been added.',
          'success'
        )

        await this.getSalonNeedToDelivers();
      }
    } catch (error) {
      await sweetAlert.fire(
        'failed!',
        'failed to add deliver request',
        'error'
      )
    }

  }

  /**
   * filter out need to delivers
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

