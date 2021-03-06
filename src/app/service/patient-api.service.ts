import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
// environment
import {environment} from '@environments/environment';
// model
import {DbWigRequest} from '@model/database/dbWigRequest';
import {TokenService} from '@services/token.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  baseUrl = `${environment.BASE_URL}/wigRequest`;
  baseUrl2 = 'http://127.0.0.1:3000/patient';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient,
              private _token: TokenService) {}

  // Get all Patients
  getPatients() {
    return this._http.get(`${this.baseUrl2}`);
  }

  // Error handling
 errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

  // Get a patient
  getPatient(id): Observable<any> {
    const url = `${this.baseUrl2}/read/${id}`;
    return this._http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get a by E-mail
  getPatientByEmail(email): Observable<any> {
    const url = `${this.baseUrl2}/readByEmail/${email}`;
    return this._http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Patient
updatePatient(id, data): Observable<any> {
  const url = `${this.baseUrl2}/update/${id}`;
  return this._http.post(url, data, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}

// Delete Patient
deletePatient(id): Observable<any> {
  const url = `${this.baseUrl}/delete/${id}`;
  return this._http.delete(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}


  getPatientId(){
    return this._token.getId()
  };

  createWigRequest(
    wigRequestData: DbWigRequest,
    patientEmail: string
  ): Observable<any> {
    return this._http
      .put(`${this.baseUrl}/add/${patientEmail}`, wigRequestData)
      .pipe(catchError(this.errorManagement));
  }

  getLastRequest(patientEmail: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/lastRequestStatus/${patientEmail}`)
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


  finishWigrequest(patientId: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/finishWigrequest/${patientId}`)
      .pipe(catchError(this.errorManagement));
  }

  cancelWigrequest(patientId: string): Observable<any> {
    return this._http
      .get(`${this.baseUrl}/cancelWigrequest/${patientId}`)
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
