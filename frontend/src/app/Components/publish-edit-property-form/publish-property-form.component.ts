import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Property } from '../../Models/propertyModel';
import { LogInService } from '../../Services/logInService/log-in.service';
import { ServicePropertyService } from '../../Services/propertyService/service-property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PropertyImageService } from '../../Services/propertyImage/property-image.service';
import { GoogleMapsService } from 'src/app/Services/googleMapsService/google-maps.service';

@Component({
  selector: 'app-publish-property-form',
  templateUrl: './publish-property-form.component.html',
  styleUrls: ['./publish-property-form.component.scss']
})
export class PublishEditPropertyFormComponent implements OnInit {
  public PropertyPublishForm:FormGroup;
  public propertyToPublish:Property = new Property();
  public edit: boolean;
  public files:Array<File> = new Array<File>();

  public imagesUrlArr = new Array<SafeUrl>();
  public pictureRowItems:number = 4;

  public tagList: string[] = ['Асансьор', 'Саниран', 'Гараж', 'Затворен комплекс', 'Паркомясто', 'Необзаведен', 'Обзаведен'];

  public buttonClicked = false;

  public citiesArr: string[];

  constructor( private formBuilder:FormBuilder,
    private loginService:LogInService,
    private propertyService:ServicePropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private imageService:PropertyImageService,
    private googleMapsService: GoogleMapsService ) { }

  ngOnInit() {
    this.PropertyPublishForm = this.generateFrom();

    this.route.data.subscribe( data => {
      this.edit = data.edit
    });
    
    if( this.route.snapshot.paramMap.get( 'id' ) != null ){
      this.propertyService.getProperty( this.route.snapshot.paramMap.get( 'id' )).subscribe( property => {
        this.propertyToPublish = property;
        
        this.fillEditFormValues( this.propertyToPublish );
        this.imagesUrlArr = this.imageService.getPropertyImagesUrl( property );
        this.files = this.imageService.getPropertyImages( property );
        
      });
    }
    
    this.googleMapsService.getCities().subscribe( data => {
      this.citiesArr = data;
    });
  }

  public generateFrom(): FormGroup {
    let titleFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let addressFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let districtFormControl = this.formBuilder.control(null, [
    ]);

    let cityFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);
    
    let priceFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let roomsFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let areaFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let typeFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let infoFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let rentFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let tagsFormControl = this.formBuilder.control( null );

    return this.formBuilder.group({
      title:titleFormControl,
      address:addressFormControl,
      district: districtFormControl,
      city: cityFormControl,
      price:priceFormControl,
      rooms:roomsFormControl,
      area:areaFormControl,
      type:typeFormControl,
      info:infoFormControl,
      rent: rentFormControl,
      tags: tagsFormControl
    });
  }

  onPublishButtonClicked(){
    this.buttonClicked = true;

    if( !this.loginService.isLoggedIn() ){
      window.alert("Log in first");
      return;
    }

    if( this.PropertyPublishForm.invalid ){
      window.alert("Invalid form");
      return;
    }

    if ( !this.fillPropertyToPublish() ){
      window.alert("Грешка");
      return;
    };
    
    this.propertyService.putProperty( this.propertyToPublish, this.files ).subscribe( data => {
      window.alert("Обявата е създадена");
    }, error => {
      window.alert("Грешка");
      console.log("Error:", error );
    } );

  }

  handleFileInput(file: File) {
    let fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL(file[0]) );
    this.imagesUrlArr = [...this.imagesUrlArr, fileUrl];
    this.files.push( file[0] );
    this.propertyToPublish.picturesNames.push( file[0].name );
  }

  fillEditFormValues( property:Property ){
    this.PropertyPublishForm.get('title').setValue( property.title );
    this.PropertyPublishForm.get('address').setValue( property.address );
    this.PropertyPublishForm.get('district').setValue( property.district );
    this.PropertyPublishForm.get('city').setValue( property.city );
    this.PropertyPublishForm.get('price').setValue( property.price );
    this.PropertyPublishForm.get('rooms').setValue( property.rooms );
    this.PropertyPublishForm.get('tags').setValue( property.tags );
    this.PropertyPublishForm.get('area').setValue( property.area );
    this.PropertyPublishForm.get('type').setValue( property.type );
    this.PropertyPublishForm.get('info').setValue( property.extraInfo );
    this.PropertyPublishForm.get('rent').setValue( property.rentFlag ? 'Rent' : 'Sell' );
  }

  fillPropertyToPublish():boolean{
    this.propertyToPublish.title = this.PropertyPublishForm.get('title').value;
    this.propertyToPublish.address = this.PropertyPublishForm.get('address').value;
    this.propertyToPublish.district = this.PropertyPublishForm.get('district').value;
    this.propertyToPublish.city = this.PropertyPublishForm.get('city').value;
    this.propertyToPublish.price = +this.PropertyPublishForm.get('price').value;
    this.propertyToPublish.rooms = +this.PropertyPublishForm.get('rooms').value;
    this.propertyToPublish.area = +this.PropertyPublishForm.get('area').value;
    this.propertyToPublish.type = this.PropertyPublishForm.get('type').value;
    this.propertyToPublish.extraInfo = this.PropertyPublishForm.get('info').value;
    this.propertyToPublish.tags = this.PropertyPublishForm.get('tags').value;

    if (this.loginService.getUser()['_id'] == null ) {
      return false;
    }
    
    this.propertyToPublish.publisherId = this.loginService.getUser()['_id'];

    this.propertyToPublish.rentFlag = this.PropertyPublishForm.get('rent').value == 'Rent' ? true : false;

    return true;
  }

  onEditButtonClicked(){
    this.buttonClicked = true;

    if( !this.loginService.isLoggedIn() ){
      window.alert("Log in first");
      return;
    }

    if( this.PropertyPublishForm.invalid ){
      window.alert("Invalid form");
      return;
    }

    this.userService.getUser( this.propertyToPublish.publisherId ).subscribe( user => {
      if( user.username != this.loginService.getUser().username){
        window.alert("Denied!");
        return;
      }

      if ( !this.fillPropertyToPublish() ){
        window.alert("Грешка");
        return;
      };
      
      this.propertyService.editProperty( this.propertyToPublish, this.files ).subscribe( data => {
        this.router.navigate(['/property/',this.propertyToPublish._id]);
      }, err => {
        console.log( err );
        window.alert("Грешка при заявка");
      });
    });
  }

  onDeletePicturesClicked(){
    this.files = new Array<File>();
    this.imagesUrlArr = new Array<SafeUrl>();
    this.propertyToPublish.picturesNames = new Array<string>();
  }
  
}
