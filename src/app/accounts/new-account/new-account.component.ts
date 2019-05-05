import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Account } from './../account.model'
import { AccountTypes } from './../account-types'
import { Select } from './../../shared/select.model'

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
    this.type.setValue(this.getAvailableAccountTypes[0].value)
  }

  public getAvailableAccountTypes(): Select[] {
    return AccountTypes
  }

  private initNewAccountForm(): void {
    this.newAccountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(this.getAvailableAccountTypes()[0].value, Validators.required),
      initialBalance: new FormControl('', Validators.required)
    })
  }

  // get properties (newAccountForm)
  get name() { return this.newAccountForm.get('name') }
  get type() { return this.newAccountForm.get('type') }
  get initialBalance() { return this.newAccountForm.get('initialBalance') }
}
