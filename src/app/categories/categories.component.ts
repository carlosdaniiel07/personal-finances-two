import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Category } from './category.model'

import { CategoryService } from './category.service'

@Component({
  selector: 'finances-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]>

  constructor(private service: CategoryService) { }

  ngOnInit() {
  	this.categories = this.service.getCategories()
  }

  public deleteCategory(category: Category): void {
  	if(confirm(`Você realmente deseja excluir a categoria ${category.Name}?`)){
  		this.categories.subscribe((categories: Category[]) => {
			  categories.splice(categories.indexOf(category), 1)
			  this.categories = of(categories)
  		})

  		this.service.deleteCategory(category.Id).subscribe()
  	}
  }
}
