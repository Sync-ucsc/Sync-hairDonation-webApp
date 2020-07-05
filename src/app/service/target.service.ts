import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private _http: HttpClient) { }

  getSalonAllTargetById(){
    this._http.get()
  }
}
