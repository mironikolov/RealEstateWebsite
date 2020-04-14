import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/Models/propertyModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PropertyImageService {
  propertyImagesUrl:string = 'http://localhost:3000/pictures/';
  serverUrl:string = 'http://localhost:3000/';

  constructor( private http:HttpClient,
    private sanitizer: DomSanitizer ) { }

  //Get Picture as blob
  getImage( propertyID:string, pictureName:string ): Observable<Blob>{
    
    return this.http.get( this.propertyImagesUrl+propertyID+`/${pictureName}` , {
      responseType:'blob'
    });
  };

  getPropertyImagesUrl( property:Property ): SafeUrl[]{
    var pictures = new Array<SafeUrl>();
    property.picturesNames.forEach( pictureName => {
      this.getImage( property._id, pictureName ).subscribe( blob => {
        const imageBlobUrl = URL.createObjectURL( blob );
        const image = this.sanitizer.bypassSecurityTrustUrl( imageBlobUrl );
        pictures.push( image );
      });
    });
    return pictures;
  }

  getPropertyImages( property: Property ): File[]{
    let pictures = new Array<File>();
    property.picturesNames.forEach( pictureName => {
      this.getImage( property._id, pictureName ).subscribe( blob => {
        pictures.push( new File([blob], pictureName, { type: "image/jpg"}) );
      });
    })
    
    return pictures;
  }

  putImages( images: Array<File> ): Observable<any>{
    let formData= new FormData();
    images.forEach(image => {
      formData.append( 'pic', image);
    });
    return this.http.post( `${this.serverUrl}pictures-upload/` , formData );
  }

}
