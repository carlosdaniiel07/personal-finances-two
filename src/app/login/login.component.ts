import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AuthService } from './../auth.service'

import { User } from './user.model'
import { Util } from './../shared/util.functions'

@Component({
  selector: 'finances-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.authService.logout(false)
    }

  	this.initForm()
  }

  private initForm(): void {
  	this.loginForm = new FormGroup({
  		nickname: new FormControl('', Validators.required),
  		password: new FormControl('', Validators.required)
  	})
  }

  public login(): void {
  	let user: any = {
      Nickname: this.nickname.value,
      Password: this.password.value
    }

    this.authService.auth(user)
  }

  public forgotPassword(): void {
  	Util.genericNotify("Not available yet. We're working on this!")
  }

  get nickname () { return this.loginForm.get('nickname') }
  get password () { return this.loginForm.get('password') }
}
