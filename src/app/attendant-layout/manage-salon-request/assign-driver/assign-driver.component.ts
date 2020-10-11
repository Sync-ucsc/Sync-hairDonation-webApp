import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TargetService} from '@services/target.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendResponse} from '@model/backendResponse';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../manage-wigrequest/manage-wigrequest.component';
import {AllSalonNeedToDelivers} from '@model/Response/allSalonNeedToDelivers';

//
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.scss']
})
export class AssignDriverComponent implements OnInit {


  displayedColumns: string[] = ['name', 'email', 'telephone', 'assign'];
  dataSource: MatTableDataSource<AllSalonNeedToDelivers>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showTable = false;
  dialogRefSub

  form: FormGroup;
  drivers: any[];

  constructor(private _target: TargetService,
              private _fb: FormBuilder,
              public dialogRef: MatDialogRef<AssignDriverComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  async ngOnInit(): Promise<void> {
    this.drivers = await this.getAllDrivers()
    this.createForm();
    this.showTable = true;
    this.dataSource = new MatTableDataSource(this.drivers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm() {
    this.form = this._fb.group({
      driver: new FormControl('', [Validators.required])
    })
  }

  async getAllDrivers() {
    try {
      const response = await this._target
        .getAllDrivers().toPromise() as BackendResponse;
      if (!response.success) throw new Error(response.debugMessage)

      return response.data.map( r => {
        return {
          ...r,
          name: r.firstName + r.lastName
        }
      });

    } catch (error) {
      console.log(error)
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async assignToDriver(driverDetails) {
    try{

      // @ts-ignore
      const salonDetails = this.data.salonDetails as AllSalonNeedToDelivers;

      const obj = {
        driverId: driverDetails._id,
        driverEmail:driverDetails.email,
        salonId: salonDetails.salonId,
        salonName: salonDetails.salonName,
        salonEmail: salonDetails.salonEmail,
        requestId: salonDetails.requestId,
        address: salonDetails.address,
        lat: salonDetails.lat,
        lng: salonDetails.lng,
        noOfWigs: salonDetails.wigCount,
        deliveryDate: new Date(),
        createdAt: new Date(),
      }

      console.log(obj);

      const response = await this._target
        .assignToDriver(driverDetails.email, obj).toPromise() as BackendResponse

      if(!response.success) throw new Error(response.debugMessage)

      console.log(response.data)

    }catch (error) {
      console.log(error)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


