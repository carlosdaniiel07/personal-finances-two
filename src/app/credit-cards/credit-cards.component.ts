import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

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

  public deleteCreditCard(creditCard: CreditCard): void {
  	if(confirm('Voce realmente deseja excluir este cartao de credito?')){
      this.creditCards.subscribe((data: CreditCard[]) => {
      	data.splice(data.indexOf(creditCard), 1)
      	this.creditCards = of(data)
      })

      this.service.deleteCreditCard(creditCard.Id).subscribe()
    }
  }
}
