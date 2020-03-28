import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { Property } from '../../Models/propertyModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicePropertyService {
  propertiesUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient ) { }

  //GetProperties
  getProperties():Observable<Property[]>
  {
    return this.http.get<Property[]>( `${this.propertiesUrl}` ).pipe( map( propertyArr => {
      return propertyArr.map( property => {
        return new Property().deserialize( property ); 
      });
    }));
  }

  getProperty(propertyID):Observable<Property>
  {
    return this.http.get<Property>(`${this.propertiesUrl}property/${propertyID}`).pipe( map( property => {
      return new Property().deserialize( property );
    }));
  }

  putProperty( property:Property, files: Array<File> )
  {
    property = new Property().deserialize( property );
    const formData = new FormData( );
    Object.keys(property).forEach( key => {
      formData.append( key, property[key]);
    } );
    console.log( JSON.stringify(formData) );
    files.forEach( file => {      
      formData.append('pic', file)
    });
    this.http.post(`${this.propertiesUrl}property/`, formData ).subscribe( data => {
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

  editProperty( property: Property, propertyID):Observable<any>{
    return this.http.post(`${this.propertiesUrl}property/edit/${propertyID}`, property);
  }

  deleteProperty( propertyID ):Observable<any>{
    return this.http.post(`${this.propertiesUrl}property/delete`, propertyID).pipe( catchError( this.errorHandler ) );
  }

  errorHandler( error: HttpErrorResponse ){
    return throwError(`Error:${error.message}`);
  }
}
