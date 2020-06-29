import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

interface IPInfo {
  latitude: string;
  longitude: string;
  country_name: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http:HttpClient) { }
  public getIPAddress(): Observable<any>
  {
    
    return this.http.get('http://ip-api.com/json');
  }

}