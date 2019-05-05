import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable, of } from 'rxjs'

import { Invoice } from './../invoice.model'
import { Movement } from './../../movements/movements.model'
import { Util } from './../../shared/util.functions'

import { InvoiceService } from './../invoice.service' 

@Component({
  selector: 'finances-invoice-details',
  templateUrl: './invoice-details.component.html'
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice
  movements: Observable<Movement[]>

  movementsCount: number = 0

  constructor(private service: InvoiceService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	let invoiceId: number = this.route.snapshot.params['id']

  	this.service.getInvoiceById(invoiceId).subscribe((response: Invoice) => this.invoice = response)
  	this.movements = this.service.getInvoiceMovements(invoiceId)

    this.movements.subscribe((data: Movement[]) => this.movementsCount = data.length)
  }

  public closeInvoice(): void {
    Util.confirmNotify('Do you realy want to close this invoice?').then((value) => {
      if(value){
        this.service.closeInvoice(this.invoice.Id).subscribe(() => {
          Util.successNotify('Invoice closed!')
          this.invoice.InvoiceStatus = 'Pending'
        })
      }
    })
  }

  public openInvoice(): void {
    Util.confirmNotify('Do you realy want to open this invoice?').then((value) => {
      if(value){
        this.service.openInvoice(this.invoice.Id).subscribe(() => {
          Util.successNotify('Invoice opened!')
          this.invoice.InvoiceStatus = 'NotClosed'
        })
      }
    }) 
  }

  public isClosed(): boolean {
    return this.invoice.InvoiceStatus != 'NotClosed'
  }

  public isPaid(): boolean {
    return this.invoice.InvoiceStatus == 'Paid'
  }
}
