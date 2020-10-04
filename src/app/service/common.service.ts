import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private data = new BehaviorSubject({
    name: ' ',
    image: ' '
  });
  data$ = this.data.asObservable();
  constructor(private token: TokenService,) {
    if(token.loggedIn()){
      this.changeData({ image: token.getImg(), name: token.getFirstName() + ' ' + token.getLastName() })
    }
   }

  changeData(data) {
    this.data.next(data)
  }
}
