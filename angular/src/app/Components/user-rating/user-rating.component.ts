import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../../Services/ratingService/rating.service'

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  userId: string;
  averageRating: number;
  rangeValue: number;

  @Input() set setUserId( userId: string ){
    this.userId = userId;
    this.refreshAverageRating();
    this.ratingService.getUserRating( userId ).subscribe( data => {

      if ( data.rating == undefined ) {
        this.rangeValue = 0;
      } else {
        this.rangeValue = data.rating;
      }
    });
  }

  constructor( private ratingService: RatingService ) { }

  ngOnInit() {

  }

  refreshAverageRating(){
    this.ratingService.getAverageRating( this.userId ).subscribe( data => {
      
      if ( data.rating != undefined ) {
        this.averageRating = +data.rating.toFixed(2);
      }
    });
  }

  onRangeChange(e){
    this.rangeValue = e.srcElement.value;
    
    this.ratingService.insertRating( this.userId, this.rangeValue ).subscribe( ()=> {
      this.refreshAverageRating();
    });
  }

}
