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

  salonId = `5f00ccbd22abe3315465b1cd`;

  baseUrl = `${environment.BASE_URL}/targets`

  constructor(private _http: HttpClient,
              private _sharedService: SharedService) {
  }

  /**
   * get all salons need to delivers
   */
  getAllSalonNeedToDelivers(): Observable<any> {
    return this._http.get(`${this.baseUrl}/allSalonNeedToDelivers`)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  /**
   * get salon need to deliver by salonId\
   */
  getSalonNeedToDeliver(salonId: string): Observable<any>{
    return this._http.get(`${this.baseUrl}/getSalonNeedToDelivers/${salonId}`)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  /**
   * add new need to deliver for salons NeedToDeliver object array
   */
  addNewNeedToDeliverToTheSalon(salonId: string): Observable<any>{
    return this._http.put(`${this.baseUrl}/addNewDeliver/${salonId}`, undefined)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  /**
   * get All drivers
   */
  getAllDrivers(): Observable<any>{
    return this._http.get(`${this.baseUrl}/allDrivers`)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  /**
   * add new location to the salon
   */
  assignToDriver(driverEmail, data): Observable<any>{
    return this._http.put(`${this.baseUrl}/assignToDriver/${driverEmail}`, data)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  getAllTarget(){
    return this._http.get(`${this.baseUrl}/all`)
  }
}
