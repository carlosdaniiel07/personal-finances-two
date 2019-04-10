import { Component, OnInit } from '@angular/core';

import { Movement } from './../movements.model'
import { MovementService } from './../movements.service'


@Component({
  selector: 'finances-movements-table',
  templateUrl: './movements-table.component.html'
})
export class MovementsTableComponent implements OnInit {
  movements: Movement[]

  constructor(private movementService:  MovementService) { }

  ngOnInit() {
  	this.movementService.getMovements().subscribe((data: Movement[]) => this.movements = data)
  }

}
