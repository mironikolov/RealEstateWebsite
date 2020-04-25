import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/userService/user.service';
import { User } from '../../Models/userModel';

@Component({
  selector: 'app-top-rated-users-carousel',
  templateUrl: './top-rated-users-carousel.component.html',
  styleUrls: ['./top-rated-users-carousel.component.scss']
})
export class TopRatedUsersCarouselComponent implements OnInit {
  private topUsers: User[];
  private limit: number = 5;
  math = Math;
  private carouselItems: number = 4;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.userService.getTopRatedUsers( this.limit ).subscribe( data => {
  
      this.topUsers = data;
    });
  }

}
