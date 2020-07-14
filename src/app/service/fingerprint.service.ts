import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  private baseUrl = 'http://127.0.0.1:3000/fingerprint';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any;

  constructor(private http: HttpClient) { }

  checkfp(fingerprint): Observable<any>{

    const url = `${this.baseUrl}/get/${fingerprint}`;
    return this.http.get(url);
  }


  getAll(): Observable<any> {

    const url = `${this.baseUrl}/getAll`;
    return this.http.get(url);
  }

  cecked(fingerprint,x){
    const url = `${this.baseUrl}/check`;
    return this.http.post(url, { Fingerprint: fingerprint, val:x});
  }
}
