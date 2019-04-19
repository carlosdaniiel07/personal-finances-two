import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'

import { Account } from './../account.model'
import { AccountService } from './../accounts.service'

@Component({
  selector: 'finances-accounts-table',
  templateUrl: './accounts-table.component.html'
})
export class AccountsTableComponent implements OnInit {
  @Input() accounts: Observable<Account[]>
  @Output() deleteAccountEvent = new EventEmitter()

  constructor(private accountService: AccountService) { }

  ngOnInit() {

  }

  deleteAccount(account: Account): void {
  	this.deleteAccountEvent.emit(account)
  }
}
