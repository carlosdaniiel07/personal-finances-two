import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { AccountService } from './../../accounts.service'
import { Movement } from './../../../movements/movements.model'

@Component({
  selector: 'finances-account-movements',
  templateUrl: './account-movements.component.html'
})
export class AccountMovementsComponent implements OnInit {

  @Input() movements: Observable<Movement[]>

  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
  	
  }

}
