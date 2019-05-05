import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Movement} from './../../movements/movements.model'

import { MovementService } from './../movements.service'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-movement-details',
  styleUrls: ['./movement-details.component.css'],
  templateUrl: './movement-details.component.html'
})
export class MovementDetailsComponent implements OnInit {
  movementDetailsForm: FormGroup
  movement: Movement

  constructor(private service: MovementService, private activeRoute: ActivatedRoute, 
  	private router: Router) { }

  ngOnInit() {
  	this.loadData()
  }

  public deleteMovement(): void {
  	Util.confirmNotify('Do you realy want to delete this movement?').then((value) => {
      if(value){
        this.service.deleteMovement(this.movement.Id).subscribe(() => {
          Util.successNotify('Movement deleted!')
          this.router.navigateByUrl('/movements')
        })
      }
    })
  }

  public isCreditMovement(): boolean {
  	return this.movement.Type === 'C'
  }

  public movementHasProject(): boolean {
    return this.movement.Project !== null
  }

  public isCreditCardMovement(): boolean {
    return this.movement.Invoice !== null
  }

  private loadData(): void {
  	this.initForm()

  	let movementId: number = this.activeRoute.snapshot.params['id']

  	this.service.getMovementById(movementId).subscribe((response: Movement) => {
  		this.movement = response
  		this.loadForm(response)
  	})
  }

  private initForm(): void {
  	this.movementDetailsForm = new FormGroup({
  		description: new FormControl(''),
  		type: new FormControl(''),
  		inclusionDate: new FormControl(''),
  		accountingDate: new FormControl(''),
  		value: new FormControl(''),
  		increase: new FormControl(''),
  		decrease: new FormControl(''),
  		account: new FormControl(''),
  		creditCard: new FormControl(''),
  		category: new FormControl(''),
  		subcategory: new FormControl(''),
  		project: new FormControl(''),
  		status: new FormControl(''),
  		automaticallyLaunch: new FormControl({ value: false, disabled: true}),
  		observation: new FormControl('')
  	})
  }

  private loadForm(movement: Movement): void {
  	this.description.setValue(movement.Description)
  	this.type.setValue(movement.Type === 'C' ? 'Credit' : 'Debit')
  	this.inclusionDate.setValue(movement.InclusionDate)
  	this.accountingDate.setValue(movement.AccountingDate)
  	this.value.setValue(movement.Value)
  	this.increase.setValue(movement.Increase)
  	this.decrease.setValue(movement.Decrease)
  	this.account.setValue(movement.Account.Name)
  	this.creditCard.setValue(movement.Invoice !== null ? movement.Invoice.CreditCard.Name : '')
  	this.category.setValue(movement.Category.Name)
  	this.subcategory.setValue(movement.Subcategory.Name)
  	this.project.setValue(movement.Project !== null ? movement.Project.Name : '')
  	this.status.setValue(movement.MovementStatus)
  	this.automaticallyLaunch.setValue(movement.AutomaticallyLaunch)
  	this.observation.setValue(movement.Observation)
  }

  get description() { return this.movementDetailsForm.get('description') }
  get type() { return this.movementDetailsForm.get('type') }
  get inclusionDate() { return this.movementDetailsForm.get('inclusionDate') }
  get accountingDate() { return this.movementDetailsForm.get('accountingDate') }
  get value() { return this.movementDetailsForm.get('value') }
  get increase() { return this.movementDetailsForm.get('increase') }
  get decrease() { return this.movementDetailsForm.get('decrease') }
  get account() { return this.movementDetailsForm.get('account') }
  get creditCard() { return this.movementDetailsForm.get('creditCard') }
  get category() { return this.movementDetailsForm.get('category') }
  get subcategory() { return this.movementDetailsForm.get('subcategory') }
  get project() { return this.movementDetailsForm.get('project') }
  get status() { return this.movementDetailsForm.get('status') }
  get automaticallyLaunch() { return this.movementDetailsForm.get('automaticallyLaunch') }
  get observation() { return this.movementDetailsForm.get('observation') }
}
