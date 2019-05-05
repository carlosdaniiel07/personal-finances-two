import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Subcategory } from './subcategory.model'
import { SubcategoryService } from './subcategory.service'

import { Util } from './../shared/util.functions'

@Component({
  selector: 'finances-subcategories',
  templateUrl: './subcategories.component.html'
})
export class SubcategoriesComponent implements OnInit {
  subcategories: Observable<Subcategory[]>

  constructor(private service: SubcategoryService) { }

  ngOnInit() {
  	this.subcategories = this.service.getSubcategories()
  }

  public deleteSubcategory(subcategory: Subcategory): void {
  	Util.confirmNotify(`Do you realy want to delete the subcategory ${subcategory.Name}?`).then((value) => {
      if(value){
        this.subcategories.subscribe((data: Subcategory[]) => {
          data.splice(data.indexOf(subcategory), 1)
          this.subcategories = of(data)
        })

        this.service.deleteSubcategory(subcategory.Id).subscribe()
      }
    })
  } 
}
