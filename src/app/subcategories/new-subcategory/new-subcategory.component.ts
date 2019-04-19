import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Observable, of } from 'rxjs'

import { Subcategory } from './../subcategory.model'
import { Category } from './../../categories/category.model'
import { Select } from './../../shared/select.model'

import { SubcategoryService } from './../subcategory.service'

@Component({
  selector: 'finances-new-subcategory',
  templateUrl: './new-subcategory.component.html'
})
export class NewSubcategoryComponent implements OnInit {
  newSubcategoryForm: FormGroup
  public availableCategories: Select[]

  constructor(private service: SubcategoryService) { }

  ngOnInit() {
    this.initForm()
    this.loadAvailableCategories()
  }

  private initForm(): void {
    this.newSubcategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  private loadForm(): void {
    let defaultCategory = (this.availableCategories.length > 0) ?
      this.availableCategories[0].value : undefined

    if(defaultCategory === undefined){
      this.category.disable()
    } else {
      this.category.setValue(defaultCategory)
    }
  }  

  private loadAvailableCategories(): void {
    this.service.getCategories().subscribe((response: Category[]) => {
      let availableCategories: Select[] = []

      response.forEach((value: Category) => 
        availableCategories.push(new Select(value.Name, value.Id, value)))

      this.availableCategories = availableCategories
      this.loadForm()
    })
  }

  public insertSubcategory(): void {
  	let subcategory = new Subcategory(undefined, this.name.value, undefined, this.category.value, true, true)
		
  	this.service.insertSubcategory(subcategory) 	
    this.clearForm()
  }

  private clearForm(): void {
    this.name.setValue('')
    this.name.markAsUntouched()
  }

  get name() { return this.newSubcategoryForm.get('name') }
  get category() { return this.newSubcategoryForm.get('category') }
}
