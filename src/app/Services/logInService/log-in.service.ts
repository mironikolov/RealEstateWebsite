import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  propertiesUrl:string = 'http://localhost:3000/';
  currentUser:User;

  constructor( private http:HttpClient ) {
    this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
  }


  findUser(username, password){
    this.http.get<User>(`${this.propertiesUrl}users/${username}&${password}`).subscribe(user => {
      localStorage.setItem( 'currentUser', JSON.stringify( user ) );
      this.currentUser=user;
    });
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
  }
}
