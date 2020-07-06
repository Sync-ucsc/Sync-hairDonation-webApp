import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
// services
import {PatientApiService} from '@services/patient-api.service';
// interface
import {DbWigRequest} from '@model/database/dbWigRequest';
import {BackendResponse} from '@model/backendResponse';

@Component({
  selector: 'app-wig-request',
  templateUrl: './wig-request.component.html',
  styleUrls: ['./wig-request.component.scss']
})
export class WigRequestComponent implements OnInit {

  Type: 'Short Hair Wigs' | 'Long Hair Wigs' | 'Curly Hair Wigs' | 'Straight Hair Wigs' = null;

  lastRequestData: DbWigRequest;

  constructor(private _fb: FormBuilder,
              private _patientService: PatientApiService,
              private _toastr: ToastrService) {
  }

  async ngOnInit(): Promise<void> {
    this.lastRequestData = await this.getLastRequest()
    console.log(this.lastRequestData)
  }

  async getLastRequest(): Promise<DbWigRequest> {
    try {
      const patientId = this._patientService.getPatientId();

      const response = await this._patientService.getLastRequest(patientId).toPromise() as BackendResponse;

      if (!response.success) throw new Error(response.debugMessage)

      return response.data as DbWigRequest;

    } catch (error) {
      console.log(error)
    }
  }

  async submit(): Promise<void> {
    try {

      this.lastRequestData = await this.getLastRequest()

      if (this.lastRequestData && !this.lastRequestData.finished && !this.lastRequestData.canceled) {
        this._toastr.warning(`your last request is still processing`);
        this.Type = null;
        return;
      }

      if (!this.Type) {
        this._toastr.warning(`plz select type`);
        return;
      }

      const patientId = this._patientService.getPatientId();

      const wigRequestObject = {
        requestDay: new Date().toISOString(),
        wigType: this.Type,
        finished: false,
        canceled: false,
        attendantStatus: 0,
      } as DbWigRequest;


      const response = await this._patientService.createWigRequest(wigRequestObject, patientId).toPromise() as BackendResponse;
      if (!response.success) throw new Error(response.debugMessage)

      this.Type = null;

      this._toastr.success(`wig request add successfully`)

    } catch (error) {
      this._toastr.warning(`fail to add wig request`)
    }

  }
}
