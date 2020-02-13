import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../../Models/propertyModel';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicePropertyService {
  propertiesUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient ) { }

  //GetProperties
  getProperties():Observable<Property[]>
  {
    return this.http.get<Property[]>( `${this.propertiesUrl}` );
  }

  getProperty(propertyID):Observable<Property>
  {
    return this.http.get<Property>(`${this.propertiesUrl}property/${propertyID}`);
  }

  putProperty( property:Property )
  {
    console.log( property );
    this.http.post(`${this.propertiesUrl}property/`, property).subscribe( data => {
      console.log("Post successful", data);
    }, error => {
      console.log("Error:", error );
    } );
  }

  putPicture( fileToUpload: File )
  {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    this.http.post(`${this.propertiesUrl}picture/`, formData).subscribe( data => {
      console.log("Post successful", data);
    }, error => {
      console.log("Error:", error );
    } );
  }

}
