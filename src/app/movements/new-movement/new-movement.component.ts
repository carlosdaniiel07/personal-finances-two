import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'

import { Observable } from 'rxjs'

import { Movement, MovementStatus, MovementType } from './../../movements/movements.model'
import { Account } from './../../accounts/account.model'
import { Category } from './../../categories/category.model'
import { Subcategory } from './../../subcategories/subcategory.model'
import { Project } from './../../projects/project.model'
import { CreditCard } from './../../credit-cards/credit-card.model'
import { Select } from './../../shared/select.model'

import { MovementService } from './../movements.service'

@Component({
  selector: 'finances-new-movement',
  templateUrl: './new-movement.component.html'
})
export class NewMovementComponent implements OnInit {
  todayDate = Date.now()
  newMovementForm: FormGroup

  availableAccounts: Select[] = []
  availableCreditCards: Select[] = []
  availableCategories: Select[] = []
  availableSubcategories: Select[] = []
  availableProjects: Select[] = []

  constructor(private service: MovementService) { }

  ngOnInit() {
  	this.loadData()
  }

  private loadData(): void {
  	this.initForm()
  	this.loadForm()
  }

  private initForm(): void {
  	this.newMovementForm = new FormGroup({
  		description: new FormControl('', Validators.required),
  		type: new FormControl('', Validators.required),
  		inclusionDate: new FormControl('', Validators.required),
  		accountingDate: new FormControl('', Validators.required),
  		value: new FormControl('', Validators.required),
  		increase: new FormControl(''),
  		decrease: new FormControl(''),
  		account: new FormControl('', Validators.required),
  		creditCard: new FormControl(''),
  		category: new FormControl('', Validators.required),
  		subcategory: new FormControl('', Validators.required),
  		project: new FormControl(''),
  		status: new FormControl('', Validators.required),
  		automaticallyLaunch: new FormControl(''),
  		observation: new FormControl('')
  	})
  }

  private loadForm(): void {
  	this.type.setValue(this.getAvailableMovementTypes()[0].value)
  	this.status.setValue(this.getAvailableMovementStatus()[0].value)

  	// accounts
  	this.service.getAllAccounts().subscribe((data: Account[]) => {
  		data.forEach((value: Account) => 
  			this.availableAccounts.push(new Select(value.Name, value.Id, value)) 
  		)
  		this.setDefaultComboBoxOption(this.account, this.availableAccounts)
  	})

  	// credit cards
  	this.service.getAllCreditCards().subscribe((data: CreditCard[]) => {
  		data.forEach((value: CreditCard) => 
  			this.availableCreditCards.push(new Select(value.Name, value.Id,  value)) 
  		)
  		this.setDefaultComboBoxOption(this.creditCard, this.availableCreditCards)
  	})

  	// categories 
  	this.service.getAllCategories().subscribe((data: Category[]) => {
  		data.forEach((value: Category) => 
  			this.availableCategories.push(new Select(value.Name, value.Id,  value)) 
  		)
  		this.setDefaultComboBoxOption(this.category, this.availableCategories)
  	})

  	// subcategories 
  	this.service.getAllSubcategories().subscribe((data: Subcategory[]) => {
  		data.forEach((value: Subcategory) => 
  			this.availableSubcategories.push(new Select(value.Name, value.Id,  value)) 
  		)
  		this.setDefaultComboBoxOption(this.subcategory, this.availableSubcategories)
  	})

  	// projects 
  	this.service.getAllProjects().subscribe((data: Project[]) => {
  		data.forEach((value: Project) => 
  			this.availableProjects.push(new Select(value.Name, value.Id,  value)) 
  		)
  		this.setDefaultComboBoxOption(this.project, this.availableProjects)
  	})
  }

  public getAvailableMovementTypes(): Select[] {
  	return MovementType
  }

  public getAvailableMovementStatus(): Select[] {
  	return MovementStatus
  }

  private setDefaultComboBoxOption(input: AbstractControl, availableOptions: Select[]): void {
  	let defaultOption = (availableOptions.length > 0) ? availableOptions[0].value : undefined

  	if (defaultOption === undefined){
  		input.disable()
  	} else {
  		input.setValue(defaultOption)
  	}
  }

  public isCreditMovement(): boolean {
  	return this.type.value == 'C'
  }

  get description() { return this.newMovementForm.get('description') }
  get type() { return this.newMovementForm.get('type') }
  get inclusionDate() { return this.newMovementForm.get('inclusionDate') }
  get accountingDate() { return this.newMovementForm.get('accountingDate') }
  get value() { return this.newMovementForm.get('value') }
  get increase() { return this.newMovementForm.get('increase') }
  get decrease() { return this.newMovementForm.get('decrease') }
  get account() { return this.newMovementForm.get('account') }
  get creditCard() { return this.newMovementForm.get('creditCard') }
  get category() { return this.newMovementForm.get('category') }
  get subcategory() { return this.newMovementForm.get('subcategory') }
  get project() { return this.newMovementForm.get('project') }
  get status() { return this.newMovementForm.get('status') }
  get automaticallyLaunch() { return this.newMovementForm.get('automaticallyLaunch') }
  get observation() { return this.newMovementForm.get('observation') }
}
