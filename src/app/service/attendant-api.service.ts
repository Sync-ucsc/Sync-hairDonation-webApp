import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// environment
import {environment} from '@environments/environment';
// model
import {DbWigRequest} from '@model/database/dbWigRequest';
import {TokenService} from '@services/token.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const baseUrl = 'http://127.0.0.1:3000/attendant';
@Injectable({
  providedIn: 'root'
})
export class AttendantApiService {

  baseUrl2 = `${environment.BASE_URL}/wigRequest/`;
  baseUrl = 'http://127.0.0.1:3000/attendant';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient,
              private _token: TokenService) {}


 // Create
 createAttendant(data): Observable<any> {
  const url = `${this.baseUrl}/create`;
  return this._http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )
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


// Get all attendants
getAttendants() {
  return this._http.get(`${this.baseUrl}`);
}

// Get an attendant
getAttendant(id): Observable<any> {
  const url = `${this.baseUrl}/read/${id}`;
  return this._http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

  getAttendantByEmail(email): Observable<any> {
    const url = `${this.baseUrl}/getAttendant/${email}`;
    return this._http.get(url, { headers: this.headers })
  }

// Update attendants
updateAttendant(id, data): Observable<any> {
  const url = `${this.baseUrl}/update/${id}`;
  return this._http.put(url, data, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}

// Delete attendant
deleteAttendant(id): Observable<any> {
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
    .put(`${this.baseUrl2}/add/${patientEmail}`, wigRequestData)
    .pipe(catchError(this.errorManagement));
}

getLastRequest(patientEmail: string): Observable<any> {
  return this._http
    .get(`${this.baseUrl2}/lastRequestStatus/${patientEmail}`)
    .pipe(catchError(this.errorManagement));
}

acceptWigrequest(patientId: string): Observable<any> {
  return this._http
    .get(`${this.baseUrl2}/acceptWigrequest/${patientId}`)
    .pipe(catchError(this.errorManagement));
}

declineWigrequest(patientId: string): Observable<any> {
  return this._http
    .get(`${this.baseUrl2}/declineWigrequest/${patientId}`)
    .pipe(catchError(this.errorManagement));
}


finishWigrequest(patientId: string): Observable<any> {
  return this._http
    .get(`${this.baseUrl2}/finishWigrequest/${patientId}`)
    .pipe(catchError(this.errorManagement));
}

cancelWigrequest(patientId: string): Observable<any> {
  return this._http
    .get(`${this.baseUrl2}/cancelWigrequest/${patientId}`)
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
