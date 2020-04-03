import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/Models/propertyModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PropertyImageService {
  propertyImagesUrl:string = 'http://localhost:3000/images/';
  serverUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient,
    private sanitizer: DomSanitizer ) { }

  //Get Picture as blob
  getImage( propertyID:string, pictureName:string ): Observable<Blob>{
    //console.log( propertyID, pictureName );
    return this.http.post( this.propertyImagesUrl+propertyID , { pictureName }, {
      responseType:'blob'
    }
    );
  };

  getPropertyImages( property:Property ): SafeUrl[]{
    var pictures = new Array<SafeUrl>();
    property.picturesNames.forEach( pcitureName => {
      this.getImage( property._id, pcitureName ).subscribe( blob => {
        const imageBlobUrl = URL.createObjectURL( blob );
        const image = this.sanitizer.bypassSecurityTrustUrl( imageBlobUrl );
        pictures.push( image );
      });
    });
    return pictures;
  }

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
