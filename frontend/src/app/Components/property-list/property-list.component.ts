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
  public propertiesArray:Property[];
  public pageSize:number = 10;
  public page:number = 1;
  pageSizeOptions: number[] = [2, 5, 10, 15];
  public allResults: number = 0;

  public query: Object;

  constructor( private propertyService:ServicePropertyService,
   private propertyImageService:PropertyImageService,
   private sanitizer: DomSanitizer,
   private queryService: QueryService ) {
     this.queryService.query.subscribe( query => {   
       
       this.query = query;
       this.page = 1;
       this.refreshPropertiesArr();
     });
    }

  ngOnInit() {
  }

  refreshPropertiesArr():void{
    if ( this.query != null) {
      this.propertyService.postFindProperties( this.query, this.page, this.pageSize ).subscribe( 
        properties => { 
          this.propertiesArray = properties.result;
          this.allResults = properties.resultCount;
        },
         error => console.log(error),
         ()=>{
           this.setPropertyPictures();
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
      if (!property) {
        return;
      }
      
      property.picturesURL[0] = image ;
    });
  }

  setPropertyPictures():void {
    this.propertiesArray.forEach( property => {
      this.setPropertyPictureURL( property  );
    });
  }

  pageEvent(e){
    this.pageSize = e.pageSize;
    this.page = ++e.pageIndex;
    this.refreshPropertiesArr();
  }
}
