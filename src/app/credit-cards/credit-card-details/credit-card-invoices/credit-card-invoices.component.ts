import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'

import { Observable, of } from 'rxjs'

import { Invoice } from './../../../invoices/invoice.model'
import { Movement } from './../../../movements/movements.model'

import { CreditCardService } from './../../credit-card.service'

@Component({
  selector: 'finances-credit-card-invoices',
  templateUrl: './credit-card-invoices.component.html'
})
export class CreditCardInvoicesComponent implements OnInit {
  invoices: Observable<Invoice[]>
  
  constructor(private service: CreditCardService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	let creditCardId = this.route.parent.snapshot.params['id']
    this.invoices = this.service.getCreditCardInvoices(creditCardId)
  }
}
