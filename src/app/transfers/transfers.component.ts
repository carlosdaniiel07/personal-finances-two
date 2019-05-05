import { Component, OnInit } from '@angular/core';

import { Util } from './../shared/util.functions'

@Component({
  selector: 'finances-transfers',
  templateUrl: './transfers.component.html'
})
export class TransfersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	this.showIsInConstructionNotify()
  }

  public showIsInConstructionNotify(): void {
  	Util.genericNotify('This page is on construction!')
  } 
}
