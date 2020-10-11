import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from '@environments/environment';

import {DbNeedToDeliver} from '@model/database/dbNeedToDeliver';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const baseUrl = 'http://127.0.0.1:3000/salon';
@Injectable({
  providedIn: 'root'
})
export class SalonApiService {
  baseUrl2 = `${environment.BASE_URL}/NeedToDeliver/`
  baseUrl = 'http://127.0.0.1:3000/salon';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  // Create
  createSalon(data): Observable<any> {
    const url = `${this.baseUrl}/create`;
    return this.http.post(url, data);
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


  // Get all salons
  getSalons() {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a salon by email
  getSalonByEmail(email): Observable<any> {
    const url = `${this.baseUrl}/getSalon/${email}`;
    return this.http.get(url, { headers: this.headers })
  }

  // Get a salon
  getSalon(id): Observable<any> {
    const url = `${this.baseUrl}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update salons
  updateSalon(id, data): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete salon
  deleteSalon(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // cahnge location
  changeLocation(data) {
    const url = `${this.baseUrl}/changeLocation`;
    return this.http.post(url, data,{ headers: this.headers });
  }

  updateWigCount(id:string,wigcount){
    return this.http
      .get(`${this.baseUrl2}/updateWigCount/${id}/${wigcount}`)
      .pipe(catchError(this.errorMgmt));
  }

  addNeedToDeliver(
    DbNeedToDeliver:DbNeedToDeliver, 
    email: string): Observable<any> {
      return this.http
        .put(`${this.baseUrl2}/add/${email}`, DbNeedToDeliver)
        .pipe(catchError(this.errorMgmt));
    }


}
