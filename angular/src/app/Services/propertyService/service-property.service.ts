import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { Property } from '../../Models/propertyModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import sessionErrorHandler from '../session-errorHandler';
import { LogInService } from '../logInService/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class ServicePropertyService {
  propertiesUrl:string = 'http://localhost:3000/properties';

  constructor( private http:HttpClient, private loginService: LogInService ) { }

  //GetProperties
  getProperties( rentFlag: boolean ):Observable<Property[]>
  {
    return this.http.get<Property[]>( `${this.propertiesUrl}/rentFlag/${rentFlag}`, { withCredentials: true } )
    .pipe( 
      map( propertyArr => {
      return propertyArr.map( property => {
        return new Property().deserialize( property ); 
      });
    }), catchError( sessionErrorHandler( this.loginService ) ));
  }

  getPropertiesByPublisherId( publisherId: string ): Observable<Property[]>
  {
    return this.http.get<Property[]>( `${this.propertiesUrl}/publisherId/${publisherId}` )
    .pipe( 
      map( propertyArr => {
      return propertyArr.map( property => {
        return new Property().deserialize( property ); 
      });
    }), catchError( sessionErrorHandler( this.loginService ) ));
  }

  getProperty( propertyID ):Observable<Property>
  {
    return this.http.get<Property>(`${this.propertiesUrl}/Id/${propertyID}`).pipe( map( property => {
      return new Property().deserialize( property );
    }));
  }

  putProperty( property:Property, files: Array<File> ):Observable<any>
  {
    property = new Property().deserialize( property );
    console.log(property);
    
    const formData = new FormData( );
    formData.append( 'data', JSON.stringify( property ) );
    
    files.forEach( file => {      
      formData.append('pic', file)
    });

    return this.http.put(`${this.propertiesUrl}`, formData, { withCredentials: true } ).pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

  //todo: move to picture service maybe
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

  editProperty( property: Property, files: File[] ):Observable<any>{
    
    const formData = new FormData();
    formData.append( 'data', JSON.stringify( property ) );
    files.forEach( file => {
      formData.append( 'pic', file );
    });
    return this.http.put(`${this.propertiesUrl}/update/`, formData, { withCredentials: true }).pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

  deleteProperty( propertyId ):Observable<any>{
    return this.http.post(`${this.propertiesUrl}/delete`, propertyId, { withCredentials: true }).pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

}
