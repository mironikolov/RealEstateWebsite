import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../Services/logInService/log-in.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Models/userModel'
import { UserService } from '../../Services/userService/user.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  SignInForm:FormGroup;
  LogInForm:FormGroup;
  newUser:User = new User();

  constructor( private loginService:LogInService, private formBuilder:FormBuilder, private userService:UserService ) { }

  ngOnInit() {
    this.LogInForm = this.generateLogInFrom();
    this.SignInForm = this.generateSignInFrom();
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
    this.loginService.findUser(this.LogInForm.get('username').value, this.LogInForm.get('password').value);
    setTimeout( () =>
    {
      if( !this.loginService.getUser() ){
        window.alert("Log in unsuccessful");
        return;
      }
      window.alert("Log in successful");
    }, 500);
    
  }

  private generateSignInFrom(): FormGroup {
    let usernameFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let passwordFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let repeatPasswordFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let emailFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    let phoneFormControl = this.formBuilder.control(null,[
      Validators.required
    ]);

    return this.formBuilder.group({
      username:usernameFormControl,
      password:passwordFormControl,
      repeatPassword:repeatPasswordFormControl,
      email:emailFormControl,
      phone:phoneFormControl
    });
  }

  onSignInButtonClick()
  {
    this.newUser.username = this.SignInForm.get('username').value;
    this.newUser.password = this.SignInForm.get('password').value;
    this.newUser.email = this.SignInForm.get('email').value;
    this.newUser.phoneNumber = this.SignInForm.get('phone').value;

    if(this.SignInForm.get('password').value != this.SignInForm.get('repeatPassword').value)
    {
      window.alert("Passwords doesnt match");
      return;
    }

    if(this.SignInForm.invalid)
    {
      window.alert("Form invalid");
      return;
    }

    this.userService.createUser( this.newUser );
    window.alert("User created");
  }

}
