import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Account } from './../account.model'
import { AccountTypes } from './../account-types'
import { Select } from './../../shared/select.model'

import { AccountService } from './../accounts.service'

@Component({
  selector: 'finances-edit-account',
  templateUrl: './edit-account.component.html'
})
export class EditAccountComponent implements OnInit {
  updateAccountForm: FormGroup
  account: Account
  
  constructor(private service: AccountService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.loadData() // load account and init the form
  }

  private loadData(): void {
    let accountId = this.route.snapshot.params['id']
    
    this.service.getAccountById(accountId).subscribe((response: Account) => {
      this.account = response;
      this.initUpdateAccountForm(response)
    })
  }

  public updateAccount(): void {
    let account = new Account(this.account.Id, this.name.value, this.type.value, this.initialBalance.value,
        this.balance.value, true)
    this.service.updateAccount(account)
  }

  public getAvailableAccountTypes(): Select[] {
    return AccountTypes
  }

  private initUpdateAccountForm(account: Account): void {
    this.updateAccountForm = new FormGroup({
      name: new FormControl(account.Name, Validators.required),
      type: new FormControl(this.getAvailableAccountTypes()
          .find(x => x.label === account.AccountType).value, Validators.required),
      initialBalance: new FormControl(account.InitialBalance, Validators.required),
      balance: new FormControl(account.Balance, Validators.required)
    })
  }

  // get properties (updateAccountForm)
  get name() { return this.updateAccountForm.get('name') }
  get type() { return this.updateAccountForm.get('type') }
  get initialBalance() { return this.updateAccountForm.get('initialBalance') }
  get balance() { return this.updateAccountForm.get('balance') }
}
