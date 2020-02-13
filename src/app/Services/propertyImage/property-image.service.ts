import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyImageService {
  propertyImagesUrl:string = 'http://localhost:3000/images/';

  constructor( private http:HttpClient ) { }

  //Get Picture as blob
  getImage( propertyID:string ): Observable<Blob>{
    return this.http.get( this.propertyImagesUrl+propertyID , { responseType: 'blob' });
  };

}
