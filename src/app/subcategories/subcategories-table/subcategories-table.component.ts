import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'

import { Subcategory } from './../subcategory.model'

@Component({
  selector: 'finances-subcategories-table',
  templateUrl: './subcategories-table.component.html'
})
export class SubcategoriesTableComponent implements OnInit {
  @Input() subcategories: Observable<Subcategory[]>
  @Output() deleteSubcategoryEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  public deleteSubcategory(subcategory: Subcategory): void {
  	this.deleteSubcategoryEvent.emit(subcategory)
  }
}
