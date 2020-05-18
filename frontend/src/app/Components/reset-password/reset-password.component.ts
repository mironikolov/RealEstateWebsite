import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm = new FormGroup({
    password: new FormControl(),
    repeatPassword: new FormControl()
  });

  public token: string;
  public message: string;

  constructor( private router: ActivatedRoute,
    private userService: UserService ) { }

  ngOnInit() {
    this.token = this.router.snapshot.paramMap.get('token');
  }

  onResetPasswordClicked(){
    if ( this.resetPasswordForm.controls['password'].value != this.resetPasswordForm.controls['repeatPassword'].value) {
      this.message = "Password don't match";
      return;
    }

    const password = this.resetPasswordForm.controls['password'].value;
    this.userService.resetPassword( this.token, password );
  }

}
