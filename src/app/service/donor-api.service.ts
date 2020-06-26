import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const baseUrl = 'http://localhost:3000/donor';
@Injectable({
  providedIn: 'root'
})
export class DonorApiService {

  baseUrl = 'http://localhost:3000/donor';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add donor requset
 donorRequset(data): Observable<any> {
  const url = `${this.baseUrl}/addDonorRequest`;
   return this.http.post(url, data);
  }


}
