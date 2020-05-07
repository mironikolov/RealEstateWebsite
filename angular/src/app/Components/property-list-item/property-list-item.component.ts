import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'
import { Property } from '../../Models/propertyModel'
import { PropertyImageService } from '../../Services/propertyImage/property-image.service'
import { UserService } from '../../Services/userService/user.service'
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Models/userModel';
import { GoogleMapsService } from '../../Services/googleMapsService/google-maps.service';
import { LogInService } from '../../Services/logInService/log-in.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueryService } from '../../Services/queryService/query.service';

@Component({
  selector: 'app-property-list-item',
  templateUrl: './property-list-item.component.html',
  styleUrls: ['./property-list-item.component.scss'],
})
export class PropertyListItemComponent implements OnInit {
  //propertyID: string;
  private property: Property;
  private publisher: User;
  private currentUser: User;

  private latitude: number;
  private longitude: number;
  private zoom: number = 14;
  private markerLatitude: number;
  private markerLongitude: number;

  constructor( private route:ActivatedRoute,
     private propertyService: ServicePropertyService,
     private propertyImageService: PropertyImageService,
     private sanitizer: DomSanitizer,
     private userService: UserService,
     private googleMapsService: GoogleMapsService,
     private logInService: LogInService,
     private dialog: MatDialog,
     private queryService: QueryService ) { }

  ngOnInit() {

    this.propertyService.getProperty(this.route.snapshot.paramMap.get( 'id' )).subscribe( ( property ) => {
      
      this.property=property;
      
      this.property.picturesURL = this.propertyImageService.getPropertyImagesUrl( property );

      this.userService.getUser(property.publisherId).subscribe( ( user ) => {
        
        this.publisher=user;
      });

      this.googleMapsService.getCoordinates( this.property.address )
      .subscribe( res => {
        if ( res.status == 'ZERO_RESULTS') {
          return;
        }
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
      if ( res.status == 'ZERO_RESULTS') {
        return;
      }
      this.markerLatitude = res.results[0].geometry.location.lat;
      this.markerLongitude = res.results[0].geometry.location.lng;
    });
  }

  //Delete porperty
  onDeleteClick(){
  this.propertyService.deleteProperty( this.property._id ).subscribe( (data) => {
    
  });
  }

  openConfirmDialog(){
    this.dialog.open( PropertyListItemDialogComponent, {
      width: '500px',
      data:{ propertyID: this.property._id }
    } );
  }

  onUserClick(){
    this.queryService.query.next({ publisherId: this.publisher._id });
  }

}

@Component({
  selector: 'app-property-list-item-dialog',
  templateUrl: './confirm-dialog.html'
})
export class PropertyListItemDialogComponent {
  private clickedYes:boolean = false;
  private message:string;

  constructor(
    private dialogRef: MatDialogRef<PropertyListItemDialogComponent>,
    private propertyService:ServicePropertyService,
    @Inject(MAT_DIALOG_DATA) public propertyId:any,
    private router:Router
  ){}

  onClickYes(){
    
    this.clickedYes = true;
    this.propertyService.deleteProperty( this.propertyId ).subscribe( ()=>{
      this.message = "Успешно изтриване";
      this.router.navigate(['/properties'])
    }, err => {
      this.message=`Грешка:${err}`;
    });
  }
}