import { Component, OnInit, Input } from '@angular/core';

import { Invoice } from './../../../../invoices/invoice.model'

@Component({
  selector: 'finances-credit-card-invoices-item',
  templateUrl: './credit-card-invoices-item.component.html'
})
export class CreditCardInvoicesItemComponent implements OnInit {
  @Input() invoice: Invoice

  constructor() { }

  ngOnInit() {
  }
}
