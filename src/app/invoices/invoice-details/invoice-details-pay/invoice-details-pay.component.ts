import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { InvoiceService } from './../../invoice.service'

import { Invoice } from './../../invoice.model'
import { Account } from './../../../accounts/account.model'
import { Select } from './../../../shared/select.model'
import { Util } from './../../../shared/util.functions'
import { MovementStatus } from './../../../movements/movements.model'

@Component({
  selector: 'finances-invoice-details-pay',
  templateUrl: './invoice-details-pay.component.html'
})
export class InvoiceDetailsPayComponent implements OnInit {
  invoice: Invoice
  payInvoiceForm: FormGroup

  availableAccounts: Select[] = []

  constructor(private service: InvoiceService, private activatedRoute: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.loadData()
  }

  public payInvoice(): void {
  	let alertString: string = (this.value.value > this.getBalanceOfSelectedAccount() && this.isLaunchedMovement()) ? 
  		'This account has no enough balance!' : ''

  	Util.confirmNotify(`Do you realy want to pay this invoice? ${alertString}`).then((value) => {
  		if(value){
  			let object = {
  				Description: this.description.value,
  				AccountingDate: Util.toEnglishFormat(Util.toDateFormat(this.accountingDate.value)),
  				AccountId: this.account.value,
  				Value: this.value.value,
  				MovementStatus: this.status.value,
  				AutomaticallyLaunch: this.automaticallyLaunch.value,
  				Observation: this.observation.value
  			}

  			this.service.payInvoice(this.invoice.Id, object).subscribe(() => {
  				Util.successNotify('Invoice paid!')
  				this.router.navigateByUrl(`/invoices/${this.invoice.Id}`)
  			})
  		}
  	})
  }

  private loadData(): void {
  	this.initForm()

  	let invoiceId: number = this.activatedRoute.snapshot.params['id']
  	
  	this.service.getInvoiceById(invoiceId).subscribe((response: Invoice) => {
  		this.invoice = response
  		this.loadForm(response)
  	})
  }

  private initForm(): void {
  	this.payInvoiceForm = new FormGroup({
  		description: new FormControl(''),
  		accountingDate: new FormControl('', Validators.required),
  		account: new FormControl('', Validators.required),
  		value: new FormControl('', Validators.required),
  		status: new FormControl('', Validators.required),
  		automaticallyLaunch: new FormControl(true, Validators.required),
  		observation: new FormControl('')
  	})
  }

  private loadForm(invoice: Invoice): void {
  	this.description.setValue(`Payment of credit card invoice #${invoice.Id}`)
  	this.value.setValue(invoice.TotalValue)
  	this.status.setValue(this.getAvailableMovementStatus()[0].value)

  	// accounts
  	this.service.getAllAccounts().subscribe((data: Account[]) => {
  		data.forEach((value: Account) => 
  			this.availableAccounts.push(new Select(value.Name, value.Id, value)) 
  		)
  		this.setDefaultComboBoxOption(this.account, this.availableAccounts)
  	})
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

  public getBalanceOfSelectedAccount(): number {
    return (this.account.value != '' ? 
      this.availableAccounts.find(a => a.value == this.account.value).object.Balance : 0)
  }

  public isLaunchedMovement(): boolean {
    return this.status.value == 2
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

  public getAvailableMovementStatus(): Select[] {
  	return MovementStatus
  }

  public isGreaterThanInvoiceValue(): boolean {
 	if(this.value.value > this.invoice.TotalValue){
 		this.value.setErrors({ greaterThanInvoiceValue: true })
 		return true
 	} else {
 		return false
 	}
  }

  get description() { return this.payInvoiceForm.get('description') }
  get accountingDate() { return this.payInvoiceForm.get('accountingDate') }
  get account() { return this.payInvoiceForm.get('account') }
  get value() { return this.payInvoiceForm.get('value') }
  get status() { return this.payInvoiceForm.get('status') }
  get automaticallyLaunch() { return this.payInvoiceForm.get('automaticallyLaunch') }
  get observation() { return this.payInvoiceForm.get('observation') }
}
