import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Observable } from 'rxjs'

import { CreditCard } from './../credit-card.model'
import { Select } from './../../shared/select.model'

import { CreditCardService } from './../credit-card.service'

@Component({
  selector: 'finances-new-credit-card',
  templateUrl: './new-credit-card.component.html'
})
export class NewCreditCardComponent implements OnInit {
  newCreditCardForm: FormGroup

  constructor(private service: CreditCardService) { }

  ngOnInit() {
  	this.initForm()
  }

  public newCreditCard(): void {
  	let creditCard = new CreditCard(undefined, this.name.value, this.invoiceClosure.value,
  		this.payDay.value, this.limit.value, true)

  	this.service.insertCreditCard(creditCard)
    this.clearForm()
  }

  private initForm(): void {
  	let defaultDay = this.getAvailableDays()[0].value

  	this.newCreditCardForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		invoiceClosure: new FormControl(defaultDay, Validators.required),
  		payDay: new FormControl(defaultDay, Validators.required),
  		limit: new FormControl('', Validators.required)
  	})
  }

  private clearForm(): void {
    let defaultDay = this.getAvailableDays()[0].value

    this.newCreditCardForm.reset()

    this.invoiceClosure.setValue(defaultDay)
    this.payDay.setValue(defaultDay)
  }

  public getAvailableDays(): Select[] {
  	let availableDays: Select[] = []

  	for(let i: number = 1; i <= 30; i++){
  		availableDays.push(new Select(i.toString(), i))
  	}

  	return availableDays
  }

  get name() { return this.newCreditCardForm.get('name') }
  get invoiceClosure() { return this.newCreditCardForm.get('invoiceClosure') }
  get payDay() { return this.newCreditCardForm.get('payDay') }
  get limit() { return this.newCreditCardForm.get('limit') }
}
