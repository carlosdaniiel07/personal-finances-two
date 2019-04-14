import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { Subcategory } from '../../../subcategories/subcategory.model'
import { CategoryService } from './../../category.service'

@Component({
  selector: 'finances-category-subcategories',
  templateUrl: './category-subcategories.component.html'
})
export class CategorySubcategoriesComponent implements OnInit {
  subcategories: Observable<Subcategory[]>

  constructor(private service: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	let categoryId = this.route.parent.snapshot.params['id']
  	this.subcategories = this.service.getCategorySubcategories(categoryId)
  }
}