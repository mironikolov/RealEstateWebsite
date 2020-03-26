import { Component, OnInit } from '@angular/core';
import { Property } from '../../Models/propertyModel'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  propertiesArray:Property[];
  propertiesArrayFiltered:Property[];
  pageSize:number = 2;
  page:number = 0;

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
       ()=>{
         this.setPropertyPictures();
         this.propertiesArrayFiltered = this.propertiesArray;
        }
    );
  }
/////////////////////////////////////////

  //get image from service
  imageBlobUrl: string | ArrayBuffer;
  image:SafeUrl;

  setPropertyPictureURL( property: Property ) : void {
    
    this.propertyImageService.getImage( property._id, property.picturesNames[0] ).subscribe( ( imageBlob ) => {
      this.imageBlobUrl = URL.createObjectURL( imageBlob );
      this.image = this.sanitizer.bypassSecurityTrustUrl( this.imageBlobUrl );
      property.picturesURL.push( this.image );
      console.log(property);
      console.log( this.image );
    });
  }

  setPropertyPictures():void {
    this.propertiesArray.forEach( property => {
      this.setPropertyPictureURL( property  );
      
    });
  }

  pageEvent(e){
    this.page = e.pageIndex;
  }

  filterFormSubmit(e){

    console.log(e.srcElement.elements[0].value);
    this.propertiesArrayFiltered = this.propertiesArray.filter( property => {
      if( property.type != e.srcElement.elements[0].value ){
        return false;
      }

      if( property.rooms != e.srcElement.elements[1].value ){
        return false;
      }

      return true;
    });
    console.log( this.propertiesArray );
  }
}
