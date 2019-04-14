import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { Movement } from './../../../movements/movements.model'
import { CategoryService } from './../../category.service'

@Component({
  selector: 'finances-category-movements',
  templateUrl: './category-movements.component.html'
})
export class CategoryMovementsComponent implements OnInit {
  movements: Observable<Movement[]>

  constructor(private service: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	let id = this.route.parent.snapshot.params['id']
  	this.movements = this.service.getCategoryMovements(id)
  }
}
