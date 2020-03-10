import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { Property } from '../../Models/propertyModel'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { UserService } from '../../Services/userService/user.service'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Models/userModel';

@Component({
  selector: 'app-property-list-item',
  templateUrl: './property-list-item.component.html',
  styleUrls: ['./property-list-item.component.scss']
})
export class PropertyListItemComponent implements OnInit {
  propertyID:string;
  property:Property;
  publisher:User;

  latitude: number = 42;
  longitude: number = 25;
  markerLatitude:number;
  markerLongitude:number;

  constructor( private route:ActivatedRoute,
     private propertyService: ServicePropertyService,
     private propertyImageService: PropertyImageService,
     private sanitizer: DomSanitizer,
     private userService: UserService ) { }

  ngOnInit() {
    //this.propertyID = 
    this.propertyService.getProperty(this.route.snapshot.paramMap.get( 'id' )).subscribe( ( property ) => {
      this.setPropertyPictureURL(property);
      this.property=property;
      this.userService.getUser(property.publisher).subscribe( ( user )=> {
        this.publisher=user;
      });
    });
  }

  onChoseLocation( event ){
    console.log( event );
    this.markerLatitude = event.coords.lat;
    this.markerLongitude = event.coords.lng;
    //const location = HttpRequest.
  }

  /////////////////////////////////////////

  //get image from service
  imageBlobUrl: string | ArrayBuffer;

  setPropertyPictureURL( property ) : void {
    this.propertyImageService.getImage( property['_id'] ).subscribe( ( imageBlob ) => {
      this.imageBlobUrl = URL.createObjectURL( imageBlob );
      property.pictureURL = this.sanitizer.bypassSecurityTrustUrl(this.imageBlobUrl);
    });
  }

}
