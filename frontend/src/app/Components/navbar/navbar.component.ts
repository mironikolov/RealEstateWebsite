import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../Services/logInService/log-in.service';
import { Router } from '@angular/router';
import { LogInModalComponent } from '../log-in-modal/log-in-modal.component';
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component'; 
import { MatDialog } from '@angular/material/dialog';
import { QueryService } from '../../Services/queryService/query.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navbarOpen = false;

  constructor( public logInService: LogInService,
    public router:Router,
    public dialog: MatDialog,
    public queryService: QueryService ) { }

  ngOnInit() {
  }

  onLogOffButtonClicked()
  {
    this.logInService.logOff();
    window.location.reload();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogInButtonClicked(): void{
    const dialogRef = this.dialog.open( LogInModalComponent, {
      width: '500px',
    });
  }

  onEditButtonClicked() {
    const dialogRef = this.dialog.open( SignInModalComponent, {
      width: '500px',
      data: { edit: true }
    });
  }

  onBuyClicked(){
    this.queryService.query.next({ rentFlag: false });
    this.router.navigate(["/properties"]);
  }

  onRentClicked(){
    this.queryService.query.next({ rentFlag: true });
    this.router.navigate(["/properties"]);
  }

  onUserClicked(){
    this.queryService.query.next({ publisherId: this.logInService.getUser()._id });
  }
}
