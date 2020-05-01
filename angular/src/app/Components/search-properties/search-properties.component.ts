import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../Services/googleMapsService/google-maps.service';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { QueryService } from '../../Services/queryService/query.service';

@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.scss']
})
export class SearchPropertiesComponent implements OnInit {
  private PropertySearchForm = new FormGroup({
    city: new FormControl(),
    district: new FormControl(),
    type: new FormControl(),
    rooms: new FormControl(),
    rentFlag: new FormControl(),
    price: new FormControl(),
    tags: new FormControl(),
    area: new FormControl()
  });

  private tagList: string[] = ['Асансьор', 'Саниран', 'Гараж', 'Затворен комплекс', 'Паркомясто', 'Необзаведен', 'Обзаведен'];

  private rentRangeSliderOptions: Options = {
    floor: 50,
    ceil: 1000,
    step: 10
  }

  private buyRangeSliderOptions: Options = {
    floor: 50000,
    ceil: 400000,
    step: 100
  }

  private areaRangeSliderOptions: Options = {
    floor: 50,
    ceil: 500,
    step: 10
  }


  constructor( private googleMaprsService: GoogleMapsService, private router: Router, private queryService: QueryService ) { }

  ngOnInit() {
  }

  private submitClick(){
    let query: Object = {};

    
    if ( +this.PropertySearchForm.controls['rooms'].value == NaN ) {
      this.PropertySearchForm.controls['rooms'].setErrors({ 'incorrect': true });
    }
    
    if ( !this.PropertySearchForm.valid ) {
      alert("invalid input");
      return;
    }

    Object.keys( this.PropertySearchForm.controls ).forEach( key => {
      if ( key == 'rentFlag' && this.PropertySearchForm.controls[key].value ) {
        this.PropertySearchForm.controls[key].value == 'Rent' ? this.PropertySearchForm.controls[key].setValue(true):
        this.PropertySearchForm.controls[key].setValue(false);
      }

      if ( key == 'price' && this.PropertySearchForm.controls[key].value  ) {
        const priceArr =  this.PropertySearchForm.controls[key].value;
        this.PropertySearchForm.controls[key].setValue({ $gt: priceArr[0], $lt: priceArr[1]})
      }

      if ( key == 'area' && this.PropertySearchForm.controls[key].value  ) {
        const areaArr =  this.PropertySearchForm.controls[key].value;
        this.PropertySearchForm.controls[key].setValue({ $gt: areaArr[0], $lt: areaArr[1]})
      }

      if ( this.PropertySearchForm.controls[key].value != null ) {
        query = { ...query, [key]: this.PropertySearchForm.controls[key].value }
      }

    });

    this.queryService.query.next( query );
    this.router.navigate(['/properties']);
  }

}
