import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { CreditCardService } from './credit-card.service'

import { CreditCard } from './credit-card.model'

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
}
