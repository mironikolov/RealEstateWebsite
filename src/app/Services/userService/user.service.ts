import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  propertiesUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient ) { }

  getUser(userID):Observable<User>{
    return this.http.get<User>(`${this.propertiesUrl}users/${userID}`);
  }

  createUser( newUser:User ){
    this.http.post(`${this.propertiesUrl}users/`, newUser).subscribe( data => {
      console.log("Post successful:", data);
    }, error => {
      console.log("Error:", error );
    } );
  }
}
