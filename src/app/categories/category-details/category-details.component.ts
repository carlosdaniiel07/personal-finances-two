import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Category } from './../category.model'
import { Movement } from './../../movements/movements.model'

import { CategoryService } from './../category.service'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-category-details',
  templateUrl: './category-details.component.html'
})
export class CategoryDetailsComponent implements OnInit {
  categoryDetailsForm: FormGroup
  category: Category
  movements: Observable<Movement[]>

  constructor(private service: CategoryService, private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
  	this.getCategoryDetails()
  	this.initForm()
  }

  private getCategoryDetails(): void {
  	let id = this.route.snapshot.params['id']

  	this.service.getCategoryById(id).subscribe((data: Category) => this.category = data)
  	this.movements = this.service.getCategoryMovements(id)
  }

  public deleteCategory(): void {
    Util.confirmNotify('Do you realy want to delete this category?').then((value) => {
      if(value){
        this.service.deleteCategory(this.category.Id).subscribe(() => {
          Util.successNotify('Category deleted!')
          this.router.navigateByUrl('/categories')
        })
      }
    })
  }

  private initForm(): void {
  	this.categoryDetailsForm = new FormGroup({
  		name: new FormControl(''),
  		type: new FormControl(''),
  		canEdit: new FormControl({ value: '', disabled: true })
  	})
  }

  get name() { return this.categoryDetailsForm.get('name') }
  get type() { return this.categoryDetailsForm.get('type') }
  get canEdit() { return this.categoryDetailsForm.get('canEdit') }
}
