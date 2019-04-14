import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { Category } from './../category.model'
import { CategoryTypes } from './../category-types'
import { Select } from './../../shared/select.model'

import { CategoryService } from './../category.service'

@Component({
  selector: 'finances-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {
  updateCategoryForm: FormGroup
  category: Category

  constructor(private service: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  // load the category and init the form
  private loadData(): void {
  	let categoryId = this.route.snapshot.params['id']

    this.service.getCategoryById(categoryId).subscribe((response: Category) => {
      this.category = response;
      this.initUpdateCategoryForm(response)
    })
  }

  private initUpdateCategoryForm(category: Category): void {
    this.updateCategoryForm = new FormGroup({
      name: new FormControl(category.Name, Validators.required),
      type: new FormControl(category.Type, Validators.required)
    })
  }

  public updateCategory(): void {
    let category = new Category(this.category.Id, this.name.value, this.type.value, this.category.Enabled, this.category.CanEdit)
    this.service.updateCategory(category)
  }

  public getAvailableTypes(): Select[] {
  	return CategoryTypes
  }

  // updateCategoryForm properties
  get name() { return this.updateCategoryForm.get('name') }
  get type() { return this.updateCategoryForm.get('type') }
}
