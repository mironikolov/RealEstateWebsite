import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { Property } from '../../Models/propertyModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import sessionErrorHandler from '../session-errorHandler';
import { LogInService } from '../logInService/log-in.service';
import { GoogleMapsService } from '../googleMapsService/google-maps.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicePropertyService {
  public propertiesUrl:string = `${environment.SERVER_URL}/properties`;

  constructor( private http:HttpClient, private loginService: LogInService, private googleMapsService: GoogleMapsService ) { }

  //GetProperties
  postFindProperties( toFind: Object, page: number, pageSize: number ):Observable<{ result: Property[], resultCount: number }>
  {
    const query = { 'toFind': toFind, 'page': page, 'pageSize': pageSize };
    
    return this.http.post< { result: Property[], resultCount: number }>( `${this.propertiesUrl}/find`, query )
    .pipe( 
      map( propertyArr  => {
      return {
        'resultCount': propertyArr.resultCount,
        'result': propertyArr.result.map( property => {
          return new Property().deserialize( property ); 
        })
      }
    }),
    catchError( sessionErrorHandler( this.loginService ) ));
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
    
    const formData = new FormData( );
    formData.append( 'data', JSON.stringify( property ) );
    
    files.forEach( file => {      
      formData.append('pic', file)
    });

    return this.http.put(`${this.propertiesUrl}`, formData, { withCredentials: true } ).pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

   editProperty( property: Property, files: File[] ):Observable<any>{

    const formData = new FormData();
    formData.append( 'data', JSON.stringify( property ) );
    files.forEach( file => {
      formData.append( 'pic', file );
    });
    return this.http.put(`${this.propertiesUrl}/update/`, formData, { withCredentials: true })
    .pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

  deleteProperty( propertyId ):Observable<any>{
    return this.http.post(`${this.propertiesUrl}/delete`, propertyId, { withCredentials: true }).pipe( catchError( sessionErrorHandler( this.loginService ) ) );
  }

}
