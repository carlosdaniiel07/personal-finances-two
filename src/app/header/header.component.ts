import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service'

@Component({
  selector: 'finances-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: string

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.currentUser = this.authService.getCurrentUserNickname()
  }

  public logout(): void {
  	this.authService.logout(true)
  }
}
