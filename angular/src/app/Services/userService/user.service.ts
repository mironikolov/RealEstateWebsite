import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../Models/userModel';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import createHandlePipeError from '../pipe-errorHandler'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //todo: move url to env, private functions
  usersUrl:string = 'http://localhost:3000/users';

  constructor( private http:HttpClient,
    private sanitizer: DomSanitizer ) { }

  getUser(userID):Observable<User>{
    return this.http.get<User>(`${this.usersUrl}/${userID}`).pipe( map( user => {
      this.getUserImageUrl( userID ).subscribe( picture => {
        user.picture = picture;
      });
      return user;
    }));
  }

  createUser( newUser:User, file: File ):Observable<any>{
    const formData = new FormData();
    formData.append( 'data', JSON.stringify( newUser ) );
    formData.append( 'pic', file);
    return this.http.post(`${this.usersUrl}`, formData );
  }

  updateUser( user:User, file: File ):Observable<any>{
        
    const formData = new FormData();
    formData.append( 'data', JSON.stringify( user ) );
    formData.append( 'pic', file[0]);
    return this.http.put(`${this.usersUrl}/update`, formData, { withCredentials: true } );
  }

  getTopRatedUsers( limit: number ): Observable<User[]>{
    return this.http.get<User[]>( `${this.usersUrl}/topRated/${limit}`).pipe( map( userArr => {
      userArr.forEach( user => {
        this.getUserImageUrl( user._id ).subscribe( picture => {
      
          user.picture = picture;
        });
      });
      return userArr;
    }));
  }

  getUserImageUrl( userId: string ): Observable<SafeUrl>{
    return this.http.get( `http://localhost:3000/pictures/${userId}/${undefined}`,
     { responseType:"blob"} ).pipe( map( blob => {
      
      const imageBlobUrl = URL.createObjectURL( blob );
      const image = this.sanitizer.bypassSecurityTrustUrl( imageBlobUrl );
      return image;
    } ), catchError( createHandlePipeError() ) );
  }
}
