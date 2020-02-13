import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Property } from '../../Models/propertyModel';
import { LogInService } from '../../Services/logInService/log-in.service'
import { ServicePropertyService } from '../../Services/propertyService/service-property.service'

@Component({
  selector: 'app-publish-property-form',
  templateUrl: './publish-property-form.component.html',
  styleUrls: ['./publish-property-form.component.scss']
})
export class PublishPropertyFormComponent implements OnInit {
  PropertyPublishForm:FormGroup;
  propertyToPublish:Property = new Property();
  fileToUpload: File = null;

  constructor( private formBuilder:FormBuilder,
    private loginService:LogInService,
    private propertyService:ServicePropertyService ) { }

  ngOnInit() {
    this.PropertyPublishForm = this.generateFrom();
    console.log(this.PropertyPublishForm.controls.title);
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

    this.propertyToPublish.title = this.PropertyPublishForm.get('title').value;
    this.propertyToPublish.address = this.PropertyPublishForm.get('address').value;
    this.propertyToPublish.price = this.PropertyPublishForm.get('price').value;
    this.propertyToPublish.rooms = this.PropertyPublishForm.get('rooms').value;
    this.propertyToPublish.area = this.PropertyPublishForm.get('area').value;
    this.propertyToPublish.type = this.PropertyPublishForm.get('type').value;
    this.propertyToPublish.publisher = this.loginService.getUser()['_id'];
    this.propertyToPublish.extraInfo = this.PropertyPublishForm.get('info').value;

    this.propertyService.putProperty(this.propertyToPublish);

    window.alert("Обявата е създадена");
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
}
}
