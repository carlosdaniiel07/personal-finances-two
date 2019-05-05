import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Account } from './account.model'

import { AccountService } from './accounts.service'

import { Util } from './../shared/util.functions'

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
  	Util.confirmNotify(`Do you realy want to delete the account ${account.Name}?`).then((value) => {
      if(value){
        this.accounts.subscribe((data: Account[]) => {
          data.splice(data.indexOf(account), 1)
          this.accounts = of(data)
        })

        this.service.deleteAccount(account.Id).subscribe()
      }
    })
  }
}
