import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { CreditCardService } from './credit-card.service'

import { CreditCard } from './credit-card.model'

import { Util } from './../shared/util.functions'

@Component({
  selector: 'finances-credit-cards',
  templateUrl: './credit-cards.component.html'
})
export class CreditCardsComponent implements OnInit {
  creditCards: Observable<CreditCard[]>

  constructor(private service: CreditCardService) { }

  ngOnInit() {
  	this.creditCards = this.service.getCreditCards()
  }

  public deleteCreditCard(creditCard: CreditCard): void {
  	Util.confirmNotify('Do you realy want to delete this credit card?').then((value: boolean) => {
      if(value){
        this.creditCards.subscribe((data: CreditCard[]) => {
        data.splice(data.indexOf(creditCard), 1)
        this.creditCards = of(data)
      })

      this.service.deleteCreditCard(creditCard.Id).subscribe()
      }
    })
  }
}
