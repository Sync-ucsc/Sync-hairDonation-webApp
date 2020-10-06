import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  baseUrl = 'http://127.0.0.1:3000/notification';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any) {
    console.log(sub)
    return this.http.post(`${this.baseUrl}/subcribe`, sub);
  }

  getAllNotification() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  send() {
    return this.http.post('/api/newsletter', null);
  }

  addNotification(data){
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  deleteNotification(id) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  repush(id) {
    let data = {
      id: id
    }
    const url = `${this.baseUrl}/repush`;
    return this.http.post(url, data);
  }
}
