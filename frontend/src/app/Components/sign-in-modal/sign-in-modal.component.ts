import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Models/userModel';
import { UserService } from '../../Services/userService/user.service'
import { LogInService } from '../../Services/logInService/log-in.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {
  public SignInForm:FormGroup;
  public newUser:User = new User();
  public userPicture: File;

  public isSubmitClicked = false;

  constructor( private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef:MatDialogRef<SignInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logInService: LogInService ) { }

  ngOnInit() {
    this.SignInForm = this.generateSignInFrom();
    if ( this.data != null ) {
      if (this.data.edit) {
        const user = this.logInService.getUser();
        this.SignInForm.patchValue({ username: user.username, email: user.email, phone: user.phoneNumber });
      }
    }
    
  }

  generateSignInFrom(): FormGroup {
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
    this.isSubmitClicked = true;

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
      return;
    }

    
    //check response
    this.userService.createUser( this.newUser, this.userPicture ).subscribe( () => {
      window.alert("User created");
      this.dialogRef.close();
    }, error => {
      console.log( error );
    });
  }

  onEditButtonClick(){
    this.isSubmitClicked = true;

    this.SignInForm.get('password').setValidators(null);
    this.SignInForm.get('repeatPassword').setValidators(null);
    this.SignInForm.get('password').updateValueAndValidity();
    this.SignInForm.get('repeatPassword').updateValueAndValidity();

    this.newUser.username = this.SignInForm.get('username').value;
    this.newUser.email = this.SignInForm.get('email').value;
    this.newUser.phoneNumber = this.SignInForm.get('phone').value;
    
    if(this.SignInForm.invalid)
    {
      return;
    }
    
    //todo check response
    this.userService.updateUser( this.newUser, this.userPicture ).subscribe( () => {
      window.alert("User updated");
      this.dialogRef.close();
    }, error => {
      console.log( error );
    });
  }
  
  handleFileInput( file: File ){
    this.userPicture = file;
  }

  onDeletePicturesClicked(){
    this.userPicture = null;
  }

}
