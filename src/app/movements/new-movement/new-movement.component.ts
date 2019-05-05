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

import { Util } from './../../shared/util.functions'

import { MovementService } from './../movements.service'

@Component({
  selector: 'finances-new-movement',
  templateUrl: './new-movement.component.html'
})
export class NewMovementComponent implements OnInit {
  newMovementForm: FormGroup

  availableAccounts: Select[] = []
  availableCreditCards: Select[] = []
  availableCategories: Select[] = []
  availableSubcategories: Select[] = []
  availableProjects: Select[] = []

  availableCategoriesFiltered: Select[] = []
  availableSubcategoriesFiltered: Select[] = []

  constructor(private service: MovementService) { }

  ngOnInit() {
  	this.loadData()
  }

  public insertMovement(): void {
    let accountBalance: number = this.getBalanceOfSelectedAccount()
    let movementValue: number = (this.value.value + this.increase.value) - this.decrease.value

    let movement: any = {
      Type: this.type.value,
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

    if(!this.isCreditMovement() && (accountBalance - movementValue) < 0 && this.isLaunchedMovement()){
      Util.confirmNotify('This account has no enough balance. Do you want to continue?').then((value) => {
        if(value){
          this.service.insertMovement(movement).subscribe(() => {
            this.clearForm()
            Util.successNotify('Movement inserted!')
          })
        } else {
          return;
        }
      })
    } else {
      this.service.insertMovement(movement).subscribe(() => {
        this.clearForm()
        Util.successNotify('Movement inserted!')
      })
    }
  }

  private loadData(): void {
  	this.initForm()
    this.loadForm()
  }

  private initForm(): void {
  	this.newMovementForm = new FormGroup({
  		description: new FormControl('', Validators.required),
  		type: new FormControl('', Validators.required),
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

  private clearForm(): void {
    this.newMovementForm.reset()

    this.availableAccounts = []
    this.availableCreditCards = []
    this.availableCategories = []
    this.availableSubcategories = []
    this.availableProjects = []

    this.availableCategoriesFiltered = []
    this.availableSubcategoriesFiltered = []

    this.loadForm()
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

  	// credit cards (optional)
  	this.service.getAllCreditCards().subscribe((data: CreditCard[]) => {
      this.availableCreditCards.push(new Select('(Optional)', ''))

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

      this.adjustCategoryComboBox()
  		this.setDefaultComboBoxOption(this.category, this.availableCategoriesFiltered)

      // subcategories 
      this.service.getAllSubcategories().subscribe((data: Subcategory[]) => {
        data.forEach((value: Subcategory) => 
          this.availableSubcategories.push(new Select(value.Name, value.Id,  value)) 
        )

        this.adjustSubcategoryComboBox()
        this.setDefaultComboBoxOption(this.subcategory, this.availableSubcategoriesFiltered)
      })
  	})

  	// projects (optional)
  	this.service.getAllProjects().subscribe((data: Project[]) => {
  		this.availableProjects.push(new Select('(Optional)', ''))

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
      input.enable()
  		input.setValue(defaultOption)
  	}
  }

  public isCreditMovement(): boolean {
  	return this.type.value == 'C'
  }

  public isLaunchedMovement(): boolean {
    return this.status.value == 2
  }

  public getBalanceOfSelectedAccount(): number {
    return (this.account.value != '' ? 
      this.availableAccounts.find(a => a.value == this.account.value).object.Balance : 0)
  }

  public getRemainingLimitOfSelectedCreditCard(): number {
    return this.creditCard.value != '' ?
      this.availableCreditCards.find(c => c.value == this.creditCard.value).object.RemainingLimit : 0
  }

  public onMovementTypeChange(): void {
    this.adjustCategoryComboBox()
    this.adjustSubcategoryComboBox()
  }

  public onCategoryChange(): void {
    this.adjustSubcategoryComboBox()
  }

  public onMovementStatusChange(): void {
    if(this.isLaunchedMovement()){
      this.automaticallyLaunch.setValue(false)
      this.automaticallyLaunch.disable()
    } else {
      this.automaticallyLaunch.setValue(true)
      this.automaticallyLaunch.enable()
    }
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

  get description() { return this.newMovementForm.get('description') }
  get type() { return this.newMovementForm.get('type') }
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
