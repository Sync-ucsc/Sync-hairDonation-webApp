import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = 'http://localhost:3000/manager';
@Injectable({
  providedIn: 'root'
})
export class ManagerApiService {

  baseUrl = 'http://localhost:3000/manager';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  // Create
  createManager(data): Observable<any> {
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
  getManagers() {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a salon
  getManager(id): Observable<any> {
    const url = `${this.baseUrl}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update salons
  updateManager(id, data): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete salon
  deleteManager(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


}
