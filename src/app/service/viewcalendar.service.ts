
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const baseUrl = 'http://localhost:3000/donorAppointment';

@Injectable({
  providedIn: 'root'
})
export class ViewCalendarService {

    baseUrl = 'http://localhost:3000/donorAppointment';
    headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(private http: HttpClient) { }

  my(){
   return this.http.get<any>(`dwe`, this.authorizationHeaders())
  }

  // get all
  getAll(){
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<any>(url)
  }

  // Create
  createAppointment(data): Observable<any> {
    const url = `${this.baseUrl}/create`;
    return this.http.post(url, data);
  }

  // create(name,date){
  //  return this.http.post<any>(`url`,{name : name , date : date}, this.authorizationHeaders());
  // }
  // updateAppointment(id,date){
  //   return this.http.post(`url`,{id : id , date : date}, this.authorizationHeaders());
  // }


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

  // Update Appointment
  updateAppointment(id, data): Observable<any> {
  const url = `${this.baseUrl}/update/${id}`;
  return this.http.post(url, data, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}

  //delete Appointment
  deleteAppointment(id):Observable<any>{
    const url='${this.baseUrl}/delete/${id}';
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
   // return this.http.post(`url`,{id : id}, this.authorizationHeaders());
  }


  authorizationHeaders(){
   return { headers : new HttpHeaders({"Authorization" : (localStorage.getItem("token"))?localStorage.getItem("token"):""})}
  }
}
