import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { Account } from './account.model'

import { AccountService } from './accounts.service'

@Component({
  selector: 'finances-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  accounts: Observable<Account[]>

  constructor(private service: AccountService) { }

  ngOnInit() {
  	this.accounts = this.service.getAccounts()
  }

}
