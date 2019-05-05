import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { CreditCard } from './../credit-card.model'
import { Invoice } from './../../invoices/invoice.model'

import { CreditCardService } from './../credit-card.service' 

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-credit-card-details',
  templateUrl: './credit-card-details.component.html'
})
export class CreditCardDetailsComponent implements OnInit {
  creditCardDetailsForm: FormGroup 
  creditCard: CreditCard

  constructor(private service: CreditCardService, private activatedRoute: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.loadData()
  }

  public deleteCreditCard(): void {
    Util.confirmNotify('Do you realy want to delete this credit card?').then((value) => {
      if(value){
        this.service.deleteCreditCard(this.creditCard.Id).subscribe(() => {
          Util.successNotify('Credit card deleted!')
          this.router.navigateByUrl('/credit-cards')
        })
      }
    })
  }

  private loadData(): void {
  	this.initForm()

  	let creditCardId = this.activatedRoute.snapshot.params['id']

  	this.service.getCreditCardById(creditCardId).subscribe((response: CreditCard) => {
  		this.creditCard = response
  		this.loadForm(response)
  	})
  }

  private initForm(): void {
  	this.creditCardDetailsForm = new FormGroup({
  		name: new FormControl(''),
  		invoiceClosure: new FormControl(''),
  		payDay: new FormControl(''),
  		limit: new FormControl(''),
  		remainingLimit: new FormControl(''),
  	})
  }

  private loadForm(creditCard: CreditCard): void {
  	this.name.setValue(creditCard.Name)
  	this.invoiceClosure.setValue(creditCard.InvoiceClosure)
  	this.payDay.setValue(creditCard.PayDay)
  	this.limit.setValue(creditCard.Limit)
  	this.remainingLimit.setValue(creditCard.RemainingLimit)
  }

  get name() { return this.creditCardDetailsForm.get('name') }
  get invoiceClosure() { return this.creditCardDetailsForm.get('invoiceClosure') }
  get payDay() { return this.creditCardDetailsForm.get('payDay') }
  get limit() { return this.creditCardDetailsForm.get('limit') }
  get remainingLimit() { return this.creditCardDetailsForm.get('remainingLimit') }
}
