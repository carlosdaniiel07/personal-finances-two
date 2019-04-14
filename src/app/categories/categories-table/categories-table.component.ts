import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'

import { Category } from './../category.model'

@Component({
  selector: 'finances-categories-table',
  templateUrl: './categories-table.component.html'
})
export class CategoriesTableComponent implements OnInit {
  @Input() categories: Observable<Category[]>
  @Output() deleteCategoryEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  public deleteCategory(category: Category): void {
  	this.deleteCategoryEvent.emit(category)
  }
}
