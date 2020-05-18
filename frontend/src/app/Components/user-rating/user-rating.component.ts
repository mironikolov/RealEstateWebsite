import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../../Services/ratingService/rating.service'
import { LogInService } from 'src/app/Services/logInService/log-in.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  public userId: string;
  public averageRating: number;
  public rangeValue: number;

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

  constructor( private ratingService: RatingService,  private logInService: LogInService) { }

  ngOnInit() {

  }

  refreshAverageRating(){
    this.ratingService.getAverageRating( this.userId ).subscribe( data => {
      if (data == null ) {
        return;
      }
      
      if ( data.rating != undefined ) {
        this.averageRating = +data.rating.toFixed(2);
      }
    });
  }

  onRangeChange(e){
    this.rangeValue = e.srcElement.value;

    if (!this.logInService.isLoggedIn()) {
      alert("Влезте в профила си");
      return;
    }
    
    this.ratingService.insertRating( this.userId, this.rangeValue ).subscribe( ()=> {
      this.refreshAverageRating();
    });
  }

}
