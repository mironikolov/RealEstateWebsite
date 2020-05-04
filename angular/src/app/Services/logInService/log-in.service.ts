import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';
import {map, catchError} from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private currentUser:User;

  constructor( private http:HttpClient ) {
    this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
  }


  logInUser( user: User ):Observable<void>{
    return this.http.post<User>(`${environment.SERVER_URL}/users/login`, user, { withCredentials: true } )
    .pipe( map( user => {
      localStorage.setItem( 'currentUser', JSON.stringify( user ) );
      this.currentUser=user;
    } ));
  }

  getUser(){
    return this.currentUser;
  }

  isLoggedIn():Boolean{
    if(!this.currentUser){
      return false;
    }
    return true;
  }

  logOff(){
    localStorage.clear();
    this.http.post(`${environment.SERVER_URL}/users/logout`, null, { withCredentials: true }).subscribe( null, err => {
      console.log(err);
    } );
    window.location.reload();
  }
}
