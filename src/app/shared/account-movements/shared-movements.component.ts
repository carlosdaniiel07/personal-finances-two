import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { AccountService } from './../../accounts/accounts.service'
import { Movement } from './../../movements/movements.model'

@Component({
  selector: 'finances-shared-movements',
  templateUrl: './shared-movements.component.html'
})
export class SharedMovementsComponent implements OnInit {

  @Input() movements: Observable<Movement[]>

  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
 	 	
  }
}
