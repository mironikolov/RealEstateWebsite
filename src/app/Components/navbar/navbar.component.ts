import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../Services/logInService/log-in.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  constructor( private logInService: LogInService, private router:Router ) { }

  ngOnInit() {
  }

  onLogInButtonClicked()
  {
    if( this.logInService.isLoggedIn() )
    {
      window.alert("Allready logged in");
      return;
    }
    this.router.navigateByUrl('/logIn');
  }

  onLogOffButtonClicked()
  {
    this.logInService.logOff();
    window.location.reload();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
