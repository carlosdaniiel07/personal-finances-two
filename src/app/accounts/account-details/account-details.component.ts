import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Account } from './../account.model'
import { Movement } from './../../movements/movements.model'

import { AccountService } from './../accounts.service'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-account-details',
  templateUrl: './account-details.component.html'
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm: FormGroup
  account: Account  

  movements: Observable<Movement[]>

  constructor(private service: AccountService, private route: ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit() {
    this.loadAccountDetails()
    this.initAccountDetailsForm()
  }

  private loadAccountDetails(): void {
    let accountId = this.route.snapshot.params['id']

    this.service.getAccountById(accountId).subscribe((response: Account) => this.account = response)
    this.movements = this.service.getAccountMovements(accountId)
  }

  public deleteAccount(): void {
    Util.confirmNotify('Do you realy want to delete this account?').then((value) => {
      if(value){
        Util.successNotify('Account deleted!')
        this.service.deleteAccount(this.account.Id).subscribe(() => this.router.navigateByUrl('/accounts'))
      }
    })
  }

  private initAccountDetailsForm(): void {
    this.accountDetailsForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      initialBalance: new FormControl(''),
      balance: new FormControl('')  
    })
  }

  public adjustAccountBalance(movement: Movement): void {
    let isMovementLaunched: boolean = movement.MovementStatus == 'Launched'

    if(isMovementLaunched){
      if(movement.Type === 'C'){
        this.account.Balance = this.account.Balance - movement.TotalValue
      } else {
        this.account.Balance = this.account.Balance + movement.TotalValue
      }
    }
  }

  // get properties (accountDetailsForm)
  get name() { return this.accountDetailsForm.get('name') }
  get type() { return this.accountDetailsForm.get('type') }
  get initialBalance() { return this.accountDetailsForm.get('initialBalance') }
  get balance() { return this.accountDetailsForm.get('balance') }
}
