import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LogInService } from '../../Services/logInService/log-in.service';
import { LogInModalComponent } from '../log-in-modal/log-in-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  constructor( private router:Router, private logInService:LogInService, private dialog: MatDialog ) { }

  ngOnInit() {
  }

  onLogInButtonClicked()
  {
    const dialogRef = this.dialog.open( LogInModalComponent, {
      width: '500px',
    });
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
