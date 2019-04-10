import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Account } from './../account.model'
import { AccountTypeSelect } from './account-type-select.model'

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

  public getAvailableAccountTypes(): AccountTypeSelect[] {
    return [
        {label: 'Checking', value: 1},
        {label: 'Savings', value: 2},
        {label: 'Salary', value: 3},
        {label: 'Investment', value: 4},
        {label: 'Wallet', value: 5}
    ]
  }

  private initUpdateAccountForm(account: Account): void {
    this.updateAccountForm = new FormGroup({
      name: new FormControl(account.Name, Validators.required),
      type: new FormControl(account.AccountType, Validators.required),
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
