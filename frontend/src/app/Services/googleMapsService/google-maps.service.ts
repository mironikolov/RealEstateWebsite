import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GoogleMapsModel } from '../../Models/googleMapsModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor( private http:HttpClient ) { }

  getCoordinates( place:String ):Observable<GoogleMapsModel>{
    
    return this.http.get<GoogleMapsModel>( `${ environment.SERVER_URL }/googleApi/${ place }` );
  }

  getPlace( lat:number, lng:number ){
    this.http.get( `${ environment.SERVER_URL }/googleApi/${ lat }/${ lng }` )
    .subscribe( googleResponse => {
      //console.log( JSON.stringify( googleResponse, null, 2 ) )
    });
  }

  getCities(): Observable<any>{
    return this.http.get( `${ environment.SERVER_URL }/citiesApi` ).pipe( map( (res: { data: Array<any> }) => {
      return res.data;
    }));
  }
}
