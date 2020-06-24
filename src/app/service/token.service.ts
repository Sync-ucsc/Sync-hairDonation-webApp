import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://localhost:3000/login'
  };
  constructor(private http: HttpClient) { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  gettoken() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.gettoken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  public isUserAdmin(): boolean {
    return 'admin' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }
  public isUserAttendant(): boolean {
    return 'attendant' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }
  public isUserDonor(): boolean {
    return 'sonor' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }
  public isUserHospital(): boolean {
    return 'hospital' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }
  public isUserPatient(): boolean {
    return 'patient' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }
  public isUserSalon(): boolean {
    return 'salon' === this.payload(this.gettoken()).ud.usertype ? true : false;
  }

}
