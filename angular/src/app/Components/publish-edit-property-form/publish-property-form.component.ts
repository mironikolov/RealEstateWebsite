import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Property } from '../../Models/propertyModel';
import { LogInService } from '../../Services/logInService/log-in.service';
import { ServicePropertyService } from '../../Services/propertyService/service-property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PropertyImageService } from '../../Services/propertyImage/property-image.service';

@Component({
  selector: 'app-publish-property-form',
  templateUrl: './publish-property-form.component.html',
  styleUrls: ['./publish-property-form.component.scss']
})
export class PublishEditPropertyFormComponent implements OnInit {
  PropertyPublishForm:FormGroup;
  propertyToPublish:Property = new Property();
  edit: boolean;
  files:Array<File> = new Array<File>();

  imagesUrlArr = new Array<SafeUrl>();
  pictureRowItems:number = 4;

  constructor( private formBuilder:FormBuilder,
    private loginService:LogInService,
    private propertyService:ServicePropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private imageService:PropertyImageService ) { }

  ngOnInit() {
    this.PropertyPublishForm = this.generateFrom();

    this.route.data.subscribe( data => {
      this.edit = data.edit
    });
    
    if( this.route.snapshot.paramMap.get( 'id' ) != null ){
      this.propertyService.getProperty( this.route.snapshot.paramMap.get( 'id' )).subscribe( property => {
        this.propertyToPublish = property;
        this.fillEditFormValues( this.propertyToPublish );
        console.log( this.propertyToPublish );
      });
    }
  }

  private generateFrom(): FormGroup {
    let titleFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let addressFormControl = this.formBuilder.control(null,[
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

    return this.formBuilder.group({
      title:titleFormControl,
      address:addressFormControl,
      price:priceFormControl,
      rooms:roomsFormControl,
      area:areaFormControl,
      type:typeFormControl,
      info:infoFormControl
    });
  }

  onPublishButtonClicked(){
    if( !this.loginService.isLoggedIn() ){
      window.alert("Log in first");
      return;
    }

    if( this.PropertyPublishForm.invalid ){
      window.alert("Invalid form");
      return;
    }

    this.fillPropertyToPublish();

    this.propertyService.putProperty( this.propertyToPublish, this.files );

    window.alert("Обявата е създадена");
  }

  handleFileInput(file: File) {
    let fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL(file[0]) );
    this.imagesUrlArr = [...this.imagesUrlArr, fileUrl];
    this.files.push( file[0] );
  }

  fillEditFormValues( property:Property ){
    this.PropertyPublishForm.get('title').setValue( property.title );
    this.PropertyPublishForm.get('address').setValue( property.address );
    this.PropertyPublishForm.get('price').setValue( property.price );
    this.PropertyPublishForm.get('rooms').setValue( property.rooms );
    this.PropertyPublishForm.get('title').setValue( property.title );
    this.PropertyPublishForm.get('area').setValue( property.area );
    this.PropertyPublishForm.get('type').setValue( property.type );
    this.PropertyPublishForm.get('info').setValue( property.extraInfo );
  }

  fillPropertyToPublish(){
    this.propertyToPublish.title = this.PropertyPublishForm.get('title').value;
    this.propertyToPublish.address = this.PropertyPublishForm.get('address').value;
    this.propertyToPublish.price = this.PropertyPublishForm.get('price').value;
    this.propertyToPublish.rooms = this.PropertyPublishForm.get('rooms').value;
    this.propertyToPublish.area = this.PropertyPublishForm.get('area').value;
    this.propertyToPublish.type = this.PropertyPublishForm.get('type').value;
    this.propertyToPublish.extraInfo = this.PropertyPublishForm.get('info').value;
    this.propertyToPublish.publisher = this.loginService.getUser()['_id'];
  }

  onEditButtonClicked(){
    if( !this.loginService.isLoggedIn() ){
      window.alert("Log in first");
      return;
    }

    if( this.PropertyPublishForm.invalid ){
      window.alert("Invalid form");
      return;
    }

    this.userService.getUser( this.propertyToPublish.publisher ).subscribe( user => {
      if( user.username != this.loginService.currentUser.username){
        window.alert("Denied!");
        return;
      }

      this.fillPropertyToPublish();
  
      this.propertyService.editProperty( this.propertyToPublish, this.propertyToPublish._id ).subscribe( data => {
        console.log( data );
        this.router.navigate(['/property/',this.propertyToPublish._id]);
      }, err => {
        console.log( err );
        window.alert("Грешка");
      });
    });
  }
  
}
