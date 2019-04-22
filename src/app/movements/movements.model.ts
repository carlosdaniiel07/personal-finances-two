import { Account } from './../accounts/account.model'
import { Category } from './../categories/category.model'
import { Subcategory } from './../subcategories/subcategory.model'
import { Project } from './../projects/project.model'
import { Invoice } from './../invoices/invoice.model'
import { Select } from './../shared/select.model'

export interface Movement {
	Id: number
	Type: string
	Description: string
	Value: number
	Increase?: number
	Decrease?: number
	InclusionDate: string
	AccountingDate: string

	Account: Account
	AccountId: number

	Category: Category
	CategoryId: number

	Subcategory: Subcategory
	SubcategoryId: number

	Project?: Project
	ProjectId: number

	Invoice?: Invoice
	InvoiceId: number

	MovementStatus: string
	Observation: string
	CanEdit: boolean
	AutomaticallyLaunch: boolean
	TotalValue: number
}

export const MovementStatus: Select[] = [
	new Select('Pending', 1),
	new Select('Launched', 2)
]

export const MovementType: Select[] = [
	new Select('Credit', 'C'),
	new Select('Debit', 'D')
]