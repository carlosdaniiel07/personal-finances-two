import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { Subcategory } from './../subcategory.model'
import { Category } from './../../categories/category.model'
import { Select } from './../../shared/select.model'

import { SubcategoryService } from './../subcategory.service'

@Component({
  selector: 'finances-edit-subcategory',
  templateUrl: './edit-subcategory.component.html'
})
export class EditSubcategoryComponent implements OnInit {
  updateSubcategoryForm: FormGroup
  subcategory: Subcategory
  availableCategories: Select[]

  constructor(private service: SubcategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	this.initForm()

  	let subcategoryId = this.route.snapshot.params['id']
  	this.service.getSubcategoryById(subcategoryId).subscribe((response: Subcategory) => {
  		this.subcategory = response
  		this.loadAvailableCategories()
		this.loadForm()
  	})
  }

  private initForm(): void {
  	this.updateSubcategoryForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		category: new FormControl('', Validators.required)
  	})
  }

  private loadForm(): void {
  	this.name.setValue(this.subcategory.Name)
  	this.category.setValue(this.subcategory.Category.Id)
  }

  private loadAvailableCategories(): void {
    this.service.getCategories().subscribe((response: Category[]) => {
      let availableCategories: Select[] = []

      response.forEach((value: Category) => 
        availableCategories.push(new Select(value.Name, value.Id, value)))

      this.availableCategories = availableCategories
    })
  }

  public updateSubcategory(): void {
  	let subcategory = new Subcategory(this.subcategory.Id, this.name.value, undefined
  		, this.category.value, true, true)

  	this.service.updateSubcategory(subcategory)
  }

  get name() { return this.updateSubcategoryForm.get('name') }
  get category() { return this.updateSubcategoryForm.get('category') }
}
