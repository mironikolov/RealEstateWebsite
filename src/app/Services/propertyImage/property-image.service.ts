import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyImageService {
  propertyImagesUrl:string = 'http://localhost:3000/images/';
  serverUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient ) { }

  //Get Picture as blob
  getImage( propertyID:string ): Observable<Blob>{
    return this.http.get( this.propertyImagesUrl+propertyID , { responseType: 'blob' });
  };

  putImages( images: Array<File> ){
    let formData= new FormData();
    images.forEach(image => {
      formData.append( 'pic', image);
    });
    this.http.post( `${this.serverUrl}pictures-upload/` , formData ).subscribe( data => {
      console.log( data );
    });
  }

}
