import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  propertiesUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient ) { }

  getUser(userID):Observable<User>{
    return this.http.get<User>(`${this.propertiesUrl}users/${userID}`);
  }

  createUser( newUser:User ):Observable<any>{
    return this.http.post(`${this.propertiesUrl}users/`, newUser);
  }
}
