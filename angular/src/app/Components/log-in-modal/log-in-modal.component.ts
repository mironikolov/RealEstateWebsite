import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../../Services/logInService/log-in.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component';
import { User } from 'src/app/Models/userModel';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss']
})
export class LogInModalComponent implements OnInit {
  LogInForm:FormGroup;

  constructor( private logInDialogRef: MatDialogRef<LogInModalComponent >, 
    private formBuilder: FormBuilder,
    private loginService: LogInService,
    private dialog: MatDialog ) { }

  ngOnInit( ) {
    this.LogInForm = this.generateLogInFrom();
  }

  private generateLogInFrom(): FormGroup {
    let usernameFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let passwordFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    return this.formBuilder.group({
      username:usernameFormControl,
      password:passwordFormControl
    });
  }

  onLogInButtonClicked(){
    let user: User = new User();
    
    user.username = this.LogInForm.get('username').value;
    user.password = this.LogInForm.get('password').value;
    this.loginService.logInUser( user ).subscribe( ()=>{
      
      if( !this.loginService.getUser() ){
        window.alert("Log in unsuccessful");
        return;
      }
      this.logInDialogRef.close();
    });
  }

  onSignInButtonClicked(): void{
    this.dialog.closeAll();
    const dialogRef = this.dialog.open( SignInModalComponent, {
      width: '500px',
    });
  }

}