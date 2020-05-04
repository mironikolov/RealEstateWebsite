import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../Models/propertyModel'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { QueryService } from '../../Services/queryService/query.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  private propertiesArray:Property[];
  private propertiesArrayFiltered:Property[];
  private pageSize:number = 8;
  private page:number = 0;

  private query: Object;

  constructor( private propertyService:ServicePropertyService,
   private propertyImageService:PropertyImageService,
   private sanitizer: DomSanitizer,
   private queryService: QueryService ) {
     this.queryService.query.subscribe( query => {
       console.log(query);
       
       this.query = query;
       this.refreshPropertiesArr();
     });
    }

  ngOnInit() {
  }

  refreshPropertiesArr():void{
    if ( this.query != null) {
      this.propertyService.postFindProperties( { ...this.query } ).subscribe( 
        properties => {
          this.propertiesArray = properties;;
        },
         error => console.log(error),
         ()=>{
           this.setPropertyPictures();
           this.propertiesArrayFiltered = this.propertiesArray;
          }
      );
    }

  }
/////////////////////////////////////////

//get image from service
  setPropertyPictureURL( property: Property ) : void {
    
    this.propertyImageService.getImage( property._id, property.picturesNames[0] ).subscribe( ( imageBlob ) => {
      const imageBlobUrl = URL.createObjectURL( imageBlob );
      const image = this.sanitizer.bypassSecurityTrustUrl( imageBlobUrl );
      property.picturesURL[0] = image ;
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

    this.propertiesArrayFiltered = this.propertiesArray.filter( property => {
      if( property.type != e.srcElement.elements[0].value ){
        return false;
      }

      if( property.rooms != e.srcElement.elements[1].value ){
        return false;
      }

      return true;
    });

  }
}
