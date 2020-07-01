import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:3000/user'
  };
  constructor(private http: HttpClient, private router: Router,) { }

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
        if (Date.now() >= payload.exp * 1000 || Object.values(this.iss).indexOf(payload.iss) === -1 ) {
          Swal.fire(
            'Time Out!',
            'Please login again!',
            'error'
          );
          this.remove()
          return false;
        }
        return (Date.now() <= payload.exp * 1000 && Object.values(this.iss).indexOf(payload.iss) > -1) ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(window.atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  public getEmail() {
    return this.payload(this.gettoken()).email;
  }

  public isUserAdmin(): boolean {
    return 'admin' === this.payload(this.gettoken()).role ? true : false;
  }
  public isUserAttendant(): boolean {
    return 'attendant' === this.payload(this.gettoken()).role ? true : false;
  }
  public isUserDonor(): boolean {
    return 'donor' === this.payload(this.gettoken()).role ? true : false;
  }
  public isUserHospital(): boolean {
    return 'hospital' === this.payload(this.gettoken()).role ? true : false;
  }
  public isUserPatient(): boolean {
    return 'patient' === this.payload(this.gettoken()).role ? true : false;
  }
  public isUserSalon(): boolean {
    return 'salon' === this.payload(this.gettoken()).role ? true : false;
  }

}
