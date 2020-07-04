import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {catchError} from 'rxjs/operators';
import {SharedService} from '@services/shared.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  baseUrl = `${environment.BASE_URL}/targets`

  constructor(private _http: HttpClient,
              private _sharedService: SharedService) {
  }

  getAllSalonNeedToDelivers(): Observable<any> {
    return this._http.get(`${this.baseUrl}/allSalonNeedToDelivers`)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }
}
