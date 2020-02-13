import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LogInService } from '../../Services/logInService/log-in.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  constructor( private router:Router, private logInService:LogInService ) { }

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

  onClickScrollDown()
  {
    
    var element = window.document.getElementById('scrollTo');
    console.log(element);
    element.scrollIntoView({behavior: "smooth"});
  }
}
