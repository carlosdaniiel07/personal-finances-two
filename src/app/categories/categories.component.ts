import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Category } from './category.model'

import { CategoryService } from './category.service'

import { Util } from '../shared/util.functions'

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
  	Util.confirmNotify(`Do you realy want to delete the category ${category.Name}?`).then((value) => {
      if(value){
        this.categories.subscribe((categories: Category[]) => {
          categories.splice(categories.indexOf(category), 1)
          this.categories = of(categories)
        })

        this.service.deleteCategory(category.Id).subscribe()
      }
    })
  }
}
