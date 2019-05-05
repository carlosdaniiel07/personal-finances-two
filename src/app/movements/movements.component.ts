import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Movement } from './movements.model'
import { MovementService } from './movements.service'

import { Util } from './../shared/util.functions'

@Component({
  selector: 'finances-movements',
  templateUrl: './movements.component.html'
})
export class MovementsComponent implements OnInit {
  movements: Observable<Movement[]>

  constructor(private service: MovementService) { }

  ngOnInit() {
  	this.movements = this.service.getMovements()
  }

  public deleteMovement(movement: Movement): void {
  	Util.confirmNotify('Do you realy want to delete this movement?').then((value) => {
      if(value){
        this.movements.subscribe((data: Movement[]) => {
          data.splice(data.indexOf(movement))
          this.movements = of(data)
        })

        this.service.deleteMovement(movement.Id).subscribe()
      }
    })
  }

  public launchMovement(movement: Movement): void {
     Util.confirmNotify('Do you realy want to launch this movement?').then((value) => {
       if(value){
         movement.MovementStatus = 'Launched'
         this.service.launchMovement(movement.Id).subscribe()
       }
     })
  }
}
