import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any;

  constructor(private http: HttpClient,private token: TokenService) {

    // this.headers.append('enctype', 'multi-part/form-data');
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('X-Requested-With', 'XMLHttpRequest');

   

  }

  adduser(data) {
    const url = `${this.baseUrl}/signup`;
    return this.http.post(url, data, { headers: this.headers });
  }

  login(data) {
    const url = `${this.baseUrl}/authenticate`;
    return this.http.post(url,data ,{ headers: this.headers });
  }
  getprofile() {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.get(`${this.baseUrl}/profile`, { headers: header });
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
