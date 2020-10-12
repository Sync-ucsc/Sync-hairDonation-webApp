import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from "@services/shared.service";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = 'http://127.0.0.1:3000/payment';

  constructor(private _http: HttpClient,
              private _sharedService: SharedService) {
  }

  createPayment(data): Observable<any> {
    return this._http.put(`${this.baseUrl}/createPayment`, data)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }


}
