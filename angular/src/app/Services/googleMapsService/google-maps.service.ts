import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GoogleMapsModel } from '../../Models/googleMapsModel';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor( private http:HttpClient ) { }

  getCoordinates( place:String ):Observable<GoogleMapsModel>{
    return this.http.get<GoogleMapsModel>( `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${environment.apiKey}` );
  }

  getPlace( lat:number, lng:number ){
    this.http.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.apiKey}` )
    .subscribe( googleResponse => {
      console.log( JSON.stringify( googleResponse, null, 2 ) )
    });
  }
}
