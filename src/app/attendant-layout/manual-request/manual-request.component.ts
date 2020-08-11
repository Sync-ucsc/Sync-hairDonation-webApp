import { TokenService } from './../../service/token.service';
import {Component, OnInit} from '@angular/core';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import  { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
// services
import { PatientApiService } from './../../service/patient-api.service';
// interface
import {DbWigRequest} from '@model/database/dbWigRequest';
import {BackendResponse} from '@model/backendResponse';




export interface DialogData {
    animal:any;
}


@Component({
  selector: 'app-manual-request',
  templateUrl: './manual-request.component.html',
  styleUrls: ['./manual-request.component.scss']
})
export class ManualRequestComponent implements OnInit {

  Type: 'Short Hair Wigs' | 'Long Hair Wigs' | 'Curly Hair Wigs' | 'Straight Hair Wigs' = null;

  lastRequestData: DbWigRequest;

  manualForm = new FormGroup({
    reportId: new FormControl('', [Validators.required])
  });


  constructor(private _fb: FormBuilder,
    private _patientService: PatientApiService,
    private _toastr: ToastrService,
    private _token: TokenService
  ) {

  }

  async ngOnInit(): Promise<void> {
    console.log(this._token.getId())
    this.lastRequestData = await this.getLastRequest()
    console.log(this.lastRequestData)
  }

  async getLastRequest(): Promise<DbWigRequest> {
    try {
      const patientreportId = this._token.getId();

      const response = await this._patientService.getLastRequest(patientreportId).toPromise() as BackendResponse;

      if (!response.success) throw new Error(response.debugMessage)
      const res = response.data as DbWigRequest;
      if (!res.wigType) return null
      return res

    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit(): Promise<void> {
    try {

      this.lastRequestData = await this.getLastRequest()

      if (this.lastRequestData && !this.lastRequestData.finished && !this.lastRequestData.canceled) {
        this._toastr.warning(`last request is still processing`);
        this.Type = null;
        return;
      }

      if (!this.Type) {
        this._toastr.warning(`plz select type`);
        return;
      }

      const patientreportId = this._token.getId();

      const wigRequestObject = {
        requestDay: new Date().toISOString(),
        wigType: this.Type,
        finished: false,
        canceled: false,
        attendantStatus: 0,
      } as DbWigRequest;


      const response = await this._patientService.createWigRequest(wigRequestObject, patientreportId).toPromise() as BackendResponse;
      if (!response.success) throw new Error(response.debugMessage)

      this.Type = null;
      this.lastRequestData = await this.getLastRequest()
      this._toastr.success(`wig request add successfully`)

    } catch (error) {
      this._toastr.warning(`fail to add wig request`)
    }

  }
}
