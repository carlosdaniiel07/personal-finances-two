import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'

import { CreditCardService } from './../credit-card.service'

import { CreditCard } from './../credit-card.model'

@Component({
  selector: 'finances-credit-cards-table',
  templateUrl: './credit-cards-table.component.html'
})
export class CreditCardsTableComponent implements OnInit {
  @Input() creditCards: Observable<CreditCard[]>
  @Output() deleteCreditCardEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  public deleteCreditCard(creditCard: CreditCard): void {
  	this.deleteCreditCardEvent.emit(creditCard)
  }
}
