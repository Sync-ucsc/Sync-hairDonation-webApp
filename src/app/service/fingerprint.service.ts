import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  private baseUrl = 'http://localhost:3000/fingerprint';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any;

  constructor(private http: HttpClient) { }

  checkfp(fingerprint): Observable<any>{

    const url = `${this.baseUrl}/get/${fingerprint}`;
    return this.http.get(url);
  }
}
