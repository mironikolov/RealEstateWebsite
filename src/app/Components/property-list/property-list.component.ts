import { Component, OnInit } from '@angular/core';
import { Property } from '../../Models/propertyModel'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  propertiesArray:Property[];

  constructor( private propertyService:ServicePropertyService,
   private propertyImageService:PropertyImageService,
   private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.refreshPropertiesArr();
  }

  refreshPropertiesArr():void{
    this.propertyService.getProperties().subscribe( 
      properties => { this.propertiesArray = properties;},
       error => console.log(error),
       ()=>this.setPropertyPictures()
    );
  }
/////////////////////////////////////////

  //get image from service
  imageBlobUrl: string | ArrayBuffer;
  image:SafeUrl;

  setPropertyPictureURL( property ) : void {
    this.propertyImageService.getImage( property['_id'] ).subscribe( ( imageBlob ) => {
      this.imageBlobUrl = URL.createObjectURL( imageBlob );
      property.pictureURL = this.sanitizer.bypassSecurityTrustUrl(this.imageBlobUrl);
    });
  }

  setPropertyPictures():void {
    this.propertiesArray.forEach( property => {
      this.setPropertyPictureURL( property  );
      
    });
  }
}
