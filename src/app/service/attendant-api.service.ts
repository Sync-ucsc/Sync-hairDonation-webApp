import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const baseUri = 'http://localhost:3000/attendant';
@Injectable({
  providedIn: 'root'
})
export class AttendantApiService {

  baseUri = 'http://localhost:3000/attendant';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

 // Create
 createAttendant(data): Observable<any> {
  const url = `${this.baseUri}/create`;
  return this.http.post(url, data)
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
  return this.http.get(`${this.baseUri}`);
}

// Get a attendant
getAttendant(id): Observable<any> {
  const url = `${this.baseUri}/read/${id}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

// Update attendants
updateAttendant(id, data): Observable<any> {
  const url = `${this.baseUri}/update/${id}`;
  return this.http.put(url, data, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}

// Delete attendant
deleteAttendant(id): Observable<any> {
  const url = `${this.baseUri}/delete/${id}`;
  return this.http.delete(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}


}
