import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
// environment
import {environment} from '@environments/environment';
// model
import {DbWigRequest} from '@model/database/dbWigRequest';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {

  baseUrl = `${environment.BASE_URL}/wigRequest/`;
  baseUrl2 = 'http://localhost:3000/patient';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
  }

  // Get all Donors
getPatients() {
  return this._http.get(`${this.baseUrl2}`);
}
  getRandomId = () => uuidV4();

  getPatientId = (): string => '5efc7cd57fc53449307d0135';

  createWigRequest(wigRequestData: DbWigRequest, patientId: string) : Observable<any>{
    return this._http.put(`${this.baseUrl}/add/${patientId}`, wigRequestData)
      .pipe(catchError(this.errorManagement));
  }

  getLastRequest(patientId: string) : Observable<any>{
    return this._http.get(`${this.baseUrl}/lastRequestStatus/${patientId}`)
      .pipe(catchError(this.errorManagement));
  }

  errorManagement(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error.message);
    } else {
      return throwError(`Error Code: ${error.status} Message: ${error.message}`);
    }
  }

}
