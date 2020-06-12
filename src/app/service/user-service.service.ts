import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient, private route:Navigator) {

  }

  login(){


    if('admin'){

    } else if('donor'){

    } else if('patient'){

    } else if('salon'){

    } else if('manager'){

    } else if('attendan'){

    } else {
      
    }
  }
}
