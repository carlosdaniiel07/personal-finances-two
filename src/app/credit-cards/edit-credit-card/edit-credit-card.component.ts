import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { CreditCard } from './../credit-card.model'
import { Select } from './../../shared/select.model'

import { CreditCardService } from './../credit-card.service'

@Component({
  selector: 'finances-edit-credit-card',
  templateUrl: './edit-credit-card.component.html'
})
export class EditCreditCardComponent implements OnInit {
  updateCreditCardForm: FormGroup
  creditCard: CreditCard

  constructor(private service: CreditCardService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData();
  }

  public updateCreditCard(): void {
  	let creditCard = new CreditCard(this.creditCard.Id, this.name.value, this.invoiceClosure.value
  		, this.payDay.value, this.limit.value, true)

  	this.service.updateCreditCard(creditCard)
  }

  private loadData(): void {
  	this.initForm()

    let creditCardId: number = this.route.snapshot.params['id']

  	this.service.getCreditCardById(creditCardId).subscribe((response: CreditCard) => {
  		this.creditCard = response
  		this.loadForm(response)
  	})
  }

  private initForm(): void {
  	let defaultDay = this.getAvailableDays()[0].value

  	this.updateCreditCardForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		invoiceClosure: new FormControl(defaultDay, Validators.required),
  		payDay: new FormControl(defaultDay, Validators.required),
  		limit: new FormControl('', Validators.required)
  	})
  }

  private loadForm(creditCard: CreditCard): void {
  	this.name.setValue(creditCard.Name)
  	this.invoiceClosure.setValue(creditCard.InvoiceClosure)
  	this.payDay.setValue(creditCard.PayDay)
  	this.limit.setValue(creditCard.Limit)
  }

  public getAvailableDays(): Select[] {
  	let availableDays: Select[] = []

  	for(let i: number = 1; i <= 30; i++){
  		availableDays.push(new Select(i.toString(), i))
  	}

  	return availableDays
  }

  get name() { return this.updateCreditCardForm.get('name') }
  get invoiceClosure() { return this.updateCreditCardForm.get('invoiceClosure') }
  get payDay() { return this.updateCreditCardForm.get('payDay') }
  get limit() { return this.updateCreditCardForm.get('limit') }
}
