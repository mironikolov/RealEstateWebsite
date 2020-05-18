import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/userModel';
import { UserService } from '../../Services/userService/user.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public user: User;

  constructor( private route:ActivatedRoute,
    private userService: UserService ) { }

  ngOnInit() {
    this.userService.getUser( this.route.snapshot.paramMap.get( 'id' ) ).subscribe( user => {
      this.user = user;
    });
  }

}
