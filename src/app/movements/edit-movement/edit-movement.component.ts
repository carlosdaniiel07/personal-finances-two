import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { Movement, MovementStatus, MovementType } from './../../movements/movements.model'
import { Account } from './../../accounts/account.model'
import { Category } from './../../categories/category.model'
import { Subcategory } from './../../subcategories/subcategory.model'
import { Project } from './../../projects/project.model'
import { CreditCard } from './../../credit-cards/credit-card.model'
import { Select } from './../../shared/select.model'

import { Util } from './../../shared/util.functions'

import { MovementService } from './../movements.service'

@Component({
  selector: 'finances-edit-movement',
  templateUrl: './edit-movement.component.html'
})
export class EditMovementComponent implements OnInit {
  movement: Movement

  updateMovementForm: FormGroup

  availableAccounts: Select[] = []
  availableCreditCards: Select[] = []
  availableCategories: Select[] = []
  availableSubcategories: Select[] = []
  availableProjects: Select[] = []

  availableCategoriesFiltered: Select[] = []
  availableSubcategoriesFiltered: Select[] = []

  constructor(private service: MovementService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadData()
  }

  public updateMovement(): void {
    let movement: any = {
      Id: this.movement.Id,
      Type: this.movement.Type,
      Description: this.description.value,
      Value: this.value.value,
      AccountingDate: Util.toEnglishFormat(Util.toDateFormat(this.accountingDate.value)),
      AccountId: this.account.value,
      CategoryId: this.category.value,
      SubcategoryId: this.subcategory.value,
      MovementStatus: this.status.value,
      Observation: this.observation.value,
      AutomaticallyLaunch: this.automaticallyLaunch.value,
      Increase: this.increase.value,
      Decrease: this.decrease.value,
      ProjectId: this.project.disabled ? undefined : this.project.value,
      InvoiceId: this.creditCard.disabled ? undefined : this.creditCard.value
    }

    this.service.updateMovement(movement)
  }

  private loadData(): void {
  	this.initForm()
    
    let movementId: number = this.route.snapshot.params['id']

    this.service.getMovementById(movementId).subscribe((response: Movement) => {
    	this.movement = response
    	this.loadForm(response)
    })	
  }

  private initForm(): void {
  	this.updateMovementForm = new FormGroup({
  		description: new FormControl('', Validators.required),
  		type: new FormControl({
        value: '',
        enabled: false
      }),
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
  		automaticallyLaunch: new FormControl(true),
  		observation: new FormControl('')
  	})
  }

  private loadForm(movement: Movement): void {
  	this.description.setValue(movement.Description)
  	this.type.setValue(movement.Type)

  	this.status.setValue(this.getAvailableMovementStatus()
  		.find(m => m.label === movement.MovementStatus).value)
  	
    this.accountingDate.setValue(Util.toDateFormat(Util.convertFromApi(movement.AccountingDate)))
  	this.value.setValue(movement.Value)
  	this.increase.setValue(movement.Increase)
  	this.decrease.setValue(movement.Decrease)
  	this.automaticallyLaunch.setValue(movement.AutomaticallyLaunch)
  	this.observation.setValue(movement.Observation)

  	// accounts
  	this.service.getAllAccounts().subscribe((data: Account[]) => {
  		data.forEach((value: Account) => 
  			this.availableAccounts.push(new Select(value.Name, value.Id, value)) 
  		)

  		this.setDefaultComboBoxOption(this.account, this.availableAccounts, movement.AccountId)
  	})

  	// credit cards (optional)
  	this.service.getAllCreditCards().subscribe((data: CreditCard[]) => {
    	this.availableCreditCards.push(new Select('(Optional)', ''))

      	data.forEach((value: CreditCard) => 
			    this.availableCreditCards.push(new Select(value.Name, value.Id,  value)) 
  		  )

  		this.setDefaultComboBoxOption(this.creditCard, this.availableCreditCards, this.isCreditCardExpense(movement) ? movement.Invoice.CreditCard.Id : null)
  	})

  	// categories 
  	this.service.getAllCategories().subscribe((data: Category[]) => {
  		data.forEach((value: Category) => 
  			this.availableCategories.push(new Select(value.Name, value.Id,  value)) 
  		)

    	this.adjustCategoryComboBox()
  		this.setDefaultComboBoxOption(this.category, this.availableCategoriesFiltered, movement.CategoryId)

      	// subcategories 
      	this.service.getAllSubcategories().subscribe((data: Subcategory[]) => {
        	data.forEach((value: Subcategory) => 
       			this.availableSubcategories.push(new Select(value.Name, value.Id,  value)) 
        	)

        	this.adjustSubcategoryComboBox()
        	this.setDefaultComboBoxOption(this.subcategory, this.availableSubcategoriesFiltered, movement.SubcategoryId)
      	})
  	})

  	// projects (optional)
  	this.service.getAllProjects().subscribe((data: Project[]) => {
  		this.availableProjects.push(new Select('(Optional)', ''))

      	data.forEach((value: Project) => 
  			this.availableProjects.push(new Select(value.Name, value.Id,  value)) 
  		)
  		this.setDefaultComboBoxOption(this.project, this.availableProjects, movement.ProjectId)
  	})
  }

  public getAvailableMovementTypes(): Select[] {
  	return MovementType
  }

  public getAvailableMovementStatus(): Select[] {
  	return MovementStatus
  }

  private setDefaultComboBoxOption(input: AbstractControl, availableOptions: Select[]
  	, selectedValue?: number): void {
  	let defaultOption: any

  	if(availableOptions.length > 0){
  		if (selectedValue !== null && availableOptions.find(x => x.value === selectedValue) !== undefined) 
  			defaultOption = selectedValue
  		else
  			defaultOption = availableOptions[0].value
  	} else {
  		defaultOption = undefined
  	}

  	if (defaultOption === undefined){
  		input.disable()
  	} else {
    	input.enable()
  		input.setValue(defaultOption)
  	}
  }

  public isCreditMovement(): boolean {
  	return this.type.value == 'C'
  }

  private isCreditCardExpense(movement: Movement): boolean {
    return movement.Invoice !== null
  }

  public getBalanceOfSelectedAccount(): number {
    return (this.account.value != '') ? 
    	this.availableAccounts.find(a => a.value === this.account.value).object.Balance : 0
  }

  public onMovementTypeChange(): void {
    this.adjustCategoryComboBox()
    this.adjustSubcategoryComboBox()
  }

  public onCategoryChange(): void {
    this.adjustSubcategoryComboBox()
  }

  private adjustCategoryComboBox(): void {
    let selectedType: string = this.type.value

    this.availableCategoriesFiltered = this.availableCategories.filter(
    	(category: Select) => category.object.Type == selectedType
    )

    // disable combo box if has no items
    this.setDefaultComboBoxOption(this.category, this.availableCategoriesFiltered)
  }

  private adjustSubcategoryComboBox(): void {
    let selectedCategoryId: number = this.category.value

    this.availableSubcategoriesFiltered = this.availableSubcategories.filter(
    	(subcategory: Select) => subcategory.object.CategoryId == selectedCategoryId
    )

  	// disable combo box if has no items
    this.setDefaultComboBoxOption(this.subcategory, this.availableSubcategoriesFiltered)
  }

  get description() { return this.updateMovementForm.get('description') }
  get type() { return this.updateMovementForm.get('type') }
  get accountingDate() { return this.updateMovementForm.get('accountingDate') }
  get value() { return this.updateMovementForm.get('value') }
  get increase() { return this.updateMovementForm.get('increase') }
  get decrease() { return this.updateMovementForm.get('decrease') }
  get account() { return this.updateMovementForm.get('account') }
  get creditCard() { return this.updateMovementForm.get('creditCard') }
  get category() { return this.updateMovementForm.get('category') }
  get subcategory() { return this.updateMovementForm.get('subcategory') }
  get project() { return this.updateMovementForm.get('project') }
  get status() { return this.updateMovementForm.get('status') }
  get automaticallyLaunch() { return this.updateMovementForm.get('automaticallyLaunch') }
  get observation() { return this.updateMovementForm.get('observation') }
}
