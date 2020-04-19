import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';
import {map, catchError} from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  propertiesUrl:string = 'http://localhost:3000/';
  currentUser:User;

  constructor( private http:HttpClient ) {
    this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
  }


  logInUser( user: User ):Observable<void>{
    return this.http.post<User>(`${this.propertiesUrl}users/login`, user, { withCredentials: true } )
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

  //todo req to server
  logOff(){
    localStorage.clear();
    this.http.post(`${this.propertiesUrl}users/logout`, null, { withCredentials: true }).subscribe( null, err => {
      console.log(err);
    } );
  }
}
