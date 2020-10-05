import {Component, Inject, OnInit} from '@angular/core';
import {TargetService} from '@services/target.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendResponse} from '@model/backendResponse';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../manage-wigrequest/manage-wigrequest.component';
import {AllSalonNeedToDelivers} from '@model/Response/allSalonNeedToDelivers';


@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.scss']
})
export class AssignDriverComponent implements OnInit {

  form: FormGroup;
  drivers: any[];

  constructor(private _target: TargetService,
              private _fb: FormBuilder,
              public dialogRef: MatDialogRef<AssignDriverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  async ngOnInit(): Promise<void> {
    this.drivers = await this.getAllDrivers()
    console.log(this.drivers)
    this.createForm();
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

      return response.data;

    } catch (error) {
      console.log(error)
    }
  }

  async AssignToDriver() {
    try{

      // @ts-ignore
      const salonDetails = this.data.salonDetails as AllSalonNeedToDelivers;
      const driverEmail = this.form.value.driver.email;

      const obj = {
        driverId: this.form.value.driver._id,
        driverEmail:this.form.value.driver.email,
        salonId: salonDetails.salonId,
        salonName: salonDetails.salonName,
        salonEmail: salonDetails.salonEmail,
        requestId: salonDetails.requestId,
        address: salonDetails.address,
        lat: salonDetails.lat,
        lng: salonDetails.lng,
        noOfWigs: 6,
        deliveryDate: new Date(),
        createdAt: new Date(),
      }

      const response = await this._target
        .assignToDriver(driverEmail, obj).toPromise() as BackendResponse

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


