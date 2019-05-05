import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'

import { Movement } from './../movements.model'
import { MovementService } from './../movements.service'


@Component({
  selector: 'finances-movements-table',
  templateUrl: './movements-table.component.html'
})
export class MovementsTableComponent implements OnInit {
  @Input() movements: Observable<Movement[]>
  
  @Output() deleteMovementEvent = new EventEmitter()
  @Output() launchMovementEvent = new EventEmitter()

  constructor(private movementService:  MovementService) { }

  ngOnInit() {
  	
  }

  public isLaunched(movement: Movement): boolean {
    return movement.MovementStatus === 'Launched'
  }

  public isCreditCardMovement(movement: Movement): boolean {
    return (movement != undefined) ? movement.Invoice != null : false
  }

  public deleteMovement(movement: Movement): void {
  	this.deleteMovementEvent.emit(movement)
  }

  public launchMovement(movement: Movement): void {
    this.launchMovementEvent.emit(movement)
  }
}
