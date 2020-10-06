import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from '@environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const baseUrl = 'http://127.0.0.1:3000/donor';
@Injectable({
  providedIn: 'root'
})
export class DonorApiService {
  baseUrl2 = `${environment.BASE_URL}/donorRequest`;
  baseUrl = 'http://127.0.0.1:3000/donor';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

    // Add donor requset
  donorRequset(data): Observable<any> {
    const url = `${this.baseUrl}/addDonorRequest`;
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


    // Get all Donors
  getDonors() {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a donor
  getDonor(id): Observable<any> {
    const url = `${this.baseUrl}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get a donor by email
  getDonorByEmail(email): Observable<any> {
    const url = `${this.baseUrl}/getDonor/${email}`;
    return this.http.get(url, {headers: this.headers})
  }


  // Update donors
  updateDonor(id, data): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete salon
  deleteDonor(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // cahnge location
  changeLocation(data){
    const url = `${this.baseUrl}/changeLocation`;
    return this.http.post(url, data, { headers: this.headers });
  }
  //change near salon
  changeNearSalon(data): Observable<any> {
    const url = `${this.baseUrl}/changeNearSalon`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //finish donor request
  finishDonorrequest(donorId: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl2}/finishDonorrequest/${donorId}`)
      .pipe(catchError(this.errorMgmt));
  }

}
