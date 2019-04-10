import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Account } from './../account.model'
import { AccountTypeSelect } from './../edit-account/account-type-select.model'

import { AccountService } from './../accounts.service'

@Component({
  selector: 'finances-new-account',
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent implements OnInit {
  newAccountForm: FormGroup

  constructor(private service: AccountService) { }

  ngOnInit() {
  	this.initNewAccountForm()
  }

  public insertAccount(): void {
  	let account = new Account(undefined, this.name.value, this.type.value, this.initialBalance.value, undefined, undefined)
    
    this.service.insertAccount(account)
    this.newAccountForm.reset()
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

  private initNewAccountForm(): void {
    this.newAccountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      initialBalance: new FormControl('', Validators.required)
    })
  }

  // get properties (newAccountForm)
  get name() { return this.newAccountForm.get('name') }
  get type() { return this.newAccountForm.get('type') }
  get initialBalance() { return this.newAccountForm.get('initialBalance') }
}
