import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs'

import { MovementService } from './../../movements/movements.service'
import { Movement } from './../../movements/movements.model'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-shared-movements',
  styleUrls: ['./shared-movements.component.css'],
  templateUrl: './shared-movements.component.html'
})
export class SharedMovementsComponent implements OnInit {

  @Input() movements: Observable<Movement[]>

  // component config
  @Input() showNewMovementButton: boolean = true
  @Input() showDeleteMovementButton: boolean = true
  @Input() condensedTable: boolean = false

  @Output() deleteMovementEvent = new EventEmitter()

  constructor(private service: MovementService) { }

  ngOnInit() {
 	 	
  }

  public deleteMovement(movement: Movement): void {
  	Util.confirmNotify('Do you realy want to delete this movement?').then((value) => {
      if(value){
        this.movements.subscribe((data: Movement[]) => {
          data.splice(data.indexOf(movement))
          this.movements = of(data)
        })

        Util.successNotify('Movement deleted!')
        this.service.deleteMovement(movement.Id).subscribe()
        this.deleteMovementEvent.emit(movement)
      }
    })
  }

  public isLaunched(movement: Movement): boolean {
    return movement.MovementStatus === 'Launched'
  }

  public isCreditCardMovement(movement: Movement): boolean {
    return movement.Invoice != undefined
  }
}
