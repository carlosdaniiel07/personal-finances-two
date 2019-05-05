import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Subcategory } from './../subcategory.model'
import { Movement } from './../../movements/movements.model'

import { SubcategoryService } from './../subcategory.service'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-subcategory-details',
  templateUrl: './subcategory-details.component.html'
})
export class SubcategoryDetailsComponent implements OnInit {
  subcategoryDetailsForm: FormGroup
  
  subcategory: Subcategory
  movements: Observable<Movement[]>

  constructor(private service: SubcategoryService, private activatedRoute: ActivatedRoute
    , private route: Router) { }

  ngOnInit() {
    this.initForm()
  	this.loadData()
  }

  private loadData(): void {
  	let id = this.activatedRoute.snapshot.params['id']

  	this.service.getSubcategoryById(id).subscribe((subcategory: Subcategory) => {
  		this.subcategory = subcategory
  		this.loadForm()
  	})
  	
  	this.movements = this.service.getSubcategoryMovements(id)
  }

  private initForm(): void {
  	this.subcategoryDetailsForm = new FormGroup({
  		name: new FormControl(''),
  		category: new FormControl(''),
  		type: new FormControl(''),
  		canEdit: new FormControl({
        value: '',
        enabled: false
      })
  	})
  }

  private loadForm(): void {
    this.name.setValue(this.subcategory.Name)
    this.category.setValue(this.subcategory.Category.Name)
    this.type.setValue(this.subcategory.Category.Type)
    this.canEdit.setValue(this.subcategory.CanEdit)
  }

  public deleteSubcategory(): void {
    Util.confirmNotify('Do you realy want to delete this subcategory?').then((value) => {
      if(value){
        this.service.deleteSubcategory(this.subcategory.Id).subscribe(() => {
          Util.successNotify('Subcategory deleted!')
          this.route.navigateByUrl('/subcategories')
        })
      }
    })
  }

  get name() { return this.subcategoryDetailsForm.get('name') } 
  get category() { return this.subcategoryDetailsForm.get('category') } 
  get type() { return this.subcategoryDetailsForm.get('type') } 
  get canEdit() { return this.subcategoryDetailsForm.get('canEdit') } 
}
