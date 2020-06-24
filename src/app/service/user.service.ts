import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any;

  constructor(private http: HttpClient) {

    // this.headers.append('enctype', 'multi-part/form-data');
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('X-Requested-With', 'XMLHttpRequest');

   

  }

  adduser(data) {
    return this.http.post(`${this.baseUrl}/adduser`, data);
  }

  login() {
    let data = {

      email: 'test1@gmail.com',
      password: 'user@1234'

    }
    const url = `${this.baseUrl}/authenticate`;
    return this.http.post(url,data ,{ headers: this.headers });
  }

  getalluser() {
    // return this.http.get<USER[]>(`${this.baseUrl}/getalluser`);
  }
  getuser(data) {
    // return this.http.post<USER>(`${this.baseUrl}/getuser`, data);
  }
  temporarydisable(data) {
    return this.http.post(`${this.baseUrl}/temporarydisable`, data);
  }
  defaultpassword(data) {
    return this.http.post(`${this.baseUrl}/defaultpassword`, data);
  }
  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/changePassword`, data);
  }


}
