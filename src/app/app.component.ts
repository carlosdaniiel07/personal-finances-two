import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  authenticated: boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
  	this.authService.authEvent.subscribe((value: boolean) => this.authenticated = value)
  }

  ngOnDestroy(){
  	this.authService.authEvent.unsubscribe()
  }
}
