import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../Services/googleMapsService/google-maps.service';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.scss']
})
export class SearchPropertiesComponent implements OnInit {
  private PropertySearchForm = new FormGroup({
    cityInput: new FormControl(),
    districtInput: new FormControl(),
    typeSelect: new FormControl(),
    roomsInput: new FormControl(),
    selectRent: new FormControl(),
    priceInput: new FormControl(),
    tagsSelect: new FormControl()
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
    step: 10
  }

  constructor( private googleMaprsService: GoogleMapsService ) { }

  ngOnInit() {
  }

}
