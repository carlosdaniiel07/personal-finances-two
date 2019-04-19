import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

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

  public deleteAccount(account: Account): void {
  	if(confirm(`Você realmente deseja excluir a conta ${account.Name}?`)){
  		this.accounts.subscribe((data: Account[]) => {
  			data.splice(data.indexOf(account), 1)
  			this.accounts = of(data)
  		})

  		this.service.deleteAccount(account.Id)
  	}
  }
}
