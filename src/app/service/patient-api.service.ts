import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
// environment
import {environment} from '@environments/environment';
// model
import {DbWigRequest} from '@model/database/dbWigRequest';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  baseUrl = `${environment.BASE_URL}/wigRequest/`;
  baseUrl2 = 'http://localhost:3000/patient';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {}

  // Get all Patients
  getPatients() {
    return this._http.get(`${this.baseUrl2}`);
  }

  // Delete patient
  deletePatient(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this._http.delete(url, { headers: this.headers }).pipe();
  }
  // Get a patient
  getPatient(id): Observable<any> {
    const url = `${this.baseUrl}/read/${id}`;
    return this._http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }
  // Get a by E-mail
  getPatientByEmail(email): Observable<any> {
    const url = `${this.baseUrl2}/readByEmail/${email}`;
    return this._http.get(url, { headers: this.headers });
  }

  getRandomId = () => uuidV4();

  getPatientId = (): string => '5efc7cd57fc53449307d0135';

  createWigRequest(
    wigRequestData: DbWigRequest,
    patientId: string
  ): Observable<any> {
    return this._http
      .put(`${this.baseUrl}/add/${patientId}`, wigRequestData)
      .pipe(catchError(this.errorManagement));
  }

  getLastRequest(patientId: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/lastRequestStatus/${patientId}`)
      .pipe(catchError(this.errorManagement));
  }

  acceptWigrequest(patientId: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/acceptWigrequest/${patientId}`)
      .pipe(catchError(this.errorManagement));
  }

  declineWigrequest(patientId: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/declineWigrequest/${patientId}`)
      .pipe(catchError(this.errorManagement));
  }

  errorManagement(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error.message);
    } else {
      return throwError(
        `Error Code: ${error.status} Message: ${error.message}`
      );
    }
  }
}
