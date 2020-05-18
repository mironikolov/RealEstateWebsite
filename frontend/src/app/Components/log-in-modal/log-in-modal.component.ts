import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../../Services/logInService/log-in.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component';
import { User } from 'src/app/Models/userModel';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss']
})
export class LogInModalComponent implements OnInit {
  public LogInForm:FormGroup;
  public isForgotPassword: boolean = false;

  public isSubmitClicked = false;

  constructor( private logInDialogRef: MatDialogRef<LogInModalComponent >, 
    private formBuilder: FormBuilder,
    private loginService: LogInService,
    private dialog: MatDialog,
    private userService: UserService ) { }

  ngOnInit( ) {
    this.LogInForm = this.generateLogInFrom();
  }

  public generateLogInFrom(): FormGroup {
    let usernameFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let passwordFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let emailFormControl = this.formBuilder.control( null );

    return this.formBuilder.group({
      username:usernameFormControl,
      password:passwordFormControl,
      email: emailFormControl
    });
  }

  onLogInButtonClicked(){
    let user: User = new User();

    this.isSubmitClicked = true;
    
    user.username = this.LogInForm.get('username').value;
    user.password = this.LogInForm.get('password').value;

    if(this.LogInForm.invalid)
    {
      return;
    }

    this.loginService.logInUser( user ).subscribe( ()=>{
      this.logInDialogRef.close();
    }, () => {
      window.alert("Log in unsuccessful");
      return;
    });
  }

  onSignInButtonClicked(): void{
    this.dialog.closeAll();
    const dialogRef = this.dialog.open( SignInModalComponent, {
      width: '500px'
    });
  }

  onForgotPasswordButtonClicked(){
    if (!this.isForgotPassword) {
      this.isForgotPassword = true;
      return;
    }
  }

  onSendEmailButtonClicked(){
    this.userService.resetPasswordToken( this.LogInForm.get('email').value );
    this.logInDialogRef.close();
    alert("Изпратен email");
  }
}
