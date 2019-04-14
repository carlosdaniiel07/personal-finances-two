import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Category } from './../category.model'
import { CategoryTypes } from './../category-types'
import { Select } from './../../shared/select.model'

import { CategoryService } from './../category.service'

@Component({
  selector: 'finances-new-category',
  templateUrl: './new-category.component.html'
})
export class NewCategoryComponent implements OnInit {
  newCategoryForm: FormGroup

  constructor(private service: CategoryService) { }

  ngOnInit() {
  	this.initForm()
  }

  insertCategory(): void {
  	let category = new Category(undefined, this.name.value, this.type.value, true, true)
  	
    this.service.insertCategory(category)
    this.initForm()
  }

  private initForm(): void {
  	this.newCategoryForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		type: new FormControl(this.getAvailableTypes()[0].value, Validators.required)
  	})
  }

  public getAvailableTypes(): Select[] {
  	return CategoryTypes
  }

  // newCategoryForm properties
  get name() { return this.newCategoryForm.get('name') }
  get type() { return this.newCategoryForm.get('type') }
}
