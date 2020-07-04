
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewCalendarService {
  constructor(private http:HttpClient) { }

  my(){
   return this.http.get<any>(`dwe`, this.authorizationHeaders())
  }
  create(name,date){
   return this.http.post<any>(`url`,{name : name , date : date}, this.authorizationHeaders());
  }
  update(id,date){
    return this.http.post(`url`,{id : id , date : date}, this.authorizationHeaders());
  }
  delete(id){
    return this.http.post(`url`,{id : id}, this.authorizationHeaders());
  }
  errorHandler(error : HttpErrorResponse){
   // return throwError(error || "Server Error");
  }

  authorizationHeaders(){
   return { headers : new HttpHeaders({"Authorization" : (localStorage.getItem("token"))?localStorage.getItem("token"):""})}
  }
}
