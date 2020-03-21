import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { Property } from '../../Models/propertyModel'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { UserService } from '../../Services/userService/user.service'
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Models/userModel';
import { GoogleMapsService } from '../../Services/googleMapsService/google-maps.service';
import { LogInService } from '../../Services/logInService/log-in.service';

@Component({
  selector: 'app-property-list-item',
  templateUrl: './property-list-item.component.html',
  styleUrls: ['./property-list-item.component.scss']
})
export class PropertyListItemComponent implements OnInit {
  propertyID: string;
  property: Property;
  publisher: User;
  currentUser: User;

  latitude: number = 42;
  longitude: number = 25;
  zoom: number = 14;
  markerLatitude: number;
  markerLongitude: number;

  constructor( private route:ActivatedRoute,
     private propertyService: ServicePropertyService,
     private propertyImageService: PropertyImageService,
     private sanitizer: DomSanitizer,
     private userService: UserService,
     private googleMapsService: GoogleMapsService,
     private logInService: LogInService ) { }

  ngOnInit() {
    this.propertyService.getProperty(this.route.snapshot.paramMap.get( 'id' )).subscribe( ( property ) => {
      this.setPropertyPictureURL(property);
      this.property=property;
      this.userService.getUser(property.publisher).subscribe( ( user )=> {
        this.publisher=user;
      });

      this.googleMapsService.getCoordinates( this.property.address )
      .subscribe( res => {
        this.latitude = res.results[0].geometry.location.lat;
        this.longitude = res.results[0].geometry.location.lng;
        this.markerLatitude = res.results[0].geometry.location.lat;
        this.markerLongitude = res.results[0].geometry.location.lng;
      });
    });

     this.currentUser = this.logInService.getUser();
  }

  onChoseLocation( event ){
    this.googleMapsService.getCoordinates( this.property.address )
    .subscribe( res => {
       //console.log( res.results[0].geometry.location.lat ) 
       this.markerLatitude = res.results[0].geometry.location.lat;
       this.markerLongitude = res.results[0].geometry.location.lng;
    });
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

  //Edit porperty
  onEditClick(){
    
  }

}
