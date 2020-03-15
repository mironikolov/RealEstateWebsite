import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Models/userModel';
import { UserService } from '../../Services/userService/user.service'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {
  SignInForm:FormGroup;
  newUser:User = new User();

  constructor( private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef:MatDialogRef<SignInModalComponent> ) { }

  ngOnInit() {
    this.SignInForm = this.generateSignInFrom();
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

    //check response
    this.userService.createUser( this.newUser ).subscribe( () => {
      window.alert("User created");
      this.dialogRef.close();
    }, error => {
      console.log( error );
    });
  }

}
