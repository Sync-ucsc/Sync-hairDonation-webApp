import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class UserServiceService {

  baseUrl = "http://localhost:3000/user";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private _http: HttpClient) {}

  //get all users
  getUsers() {
    return this._http.get(`${this.baseUrl}`);
  }

 //delete a single user
  deleteUser(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this._http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }


  //error management

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
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



  //login
  login() {
    if ("admin") {
    } else if ("donor") {
    } else if ("patient") {
    } else if ("salon") {
    } else if ("manager") {
    } else if ("attendant") {
    } else {
    }
  }
}
