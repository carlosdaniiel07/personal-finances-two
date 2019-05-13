import { Component, OnInit } from '@angular/core';

import { Util } from './../../../shared/util.functions'

@Component({
  selector: 'finances-invoice-details-print',
  templateUrl: './invoice-details-print.component.html'
})
export class InvoiceDetailsPrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	Util.genericNotify('This page is on construction!')
  }

}
