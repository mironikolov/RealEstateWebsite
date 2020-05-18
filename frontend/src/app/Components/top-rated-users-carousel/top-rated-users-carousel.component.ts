import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/userService/user.service';
import { User } from '../../Models/userModel';
import { QueryService } from '../../Services/queryService/query.service';

@Component({
  selector: 'app-top-rated-users-carousel',
  templateUrl: './top-rated-users-carousel.component.html',
  styleUrls: ['./top-rated-users-carousel.component.scss']
})
export class TopRatedUsersCarouselComponent implements OnInit {
  public topUsers: User[];
  public limit: number = 5;
  public math = Math;
  public carouselItems: number = 4;

  constructor( private userService: UserService, private queryService: QueryService ) { }

  ngOnInit() {
    this.userService.getTopRatedUsers( this.limit ).subscribe( data => {
  
      this.topUsers = data;
    });
  }

  onUserClick( userId ){
    this.queryService.query.next({ publisherId: userId });
  }

}
