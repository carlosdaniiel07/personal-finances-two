import { Account } from './../accounts/account.model'
import { Category } from './../categories/category.model'
import { Subcategory } from './../subcategories/subcategory.model'
import { Project } from './../projects/project.model'
import { Invoice } from './../invoices/invoice.model'
import { Select } from './../shared/select.model'

export class Movement {
	constructor(
		public Id: number,
		public Type: string,
		public Description: string,
	 	public Value: number,
		public InclusionDate: string,
	    public AccountingDate: string,
	   
	   	public Account: Account,
		public AccountId: number,

		public Category: Category,
		public CategoryId: number,

		public Subcategory: Subcategory,
		public SubcategoryId: number,

		public MovementStatus: string,
		public Observation: string,
		public CanEdit: boolean,
		public AutomaticallyLaunch: boolean,
		public TotalValue: number,

		public Increase?: number,
		public Decrease?: number,

		public Project?: Project,
		public ProjectId?: number,

		public Invoice?: Invoice,
		public InvoiceId?: number
	) {}
}

export const MovementStatus: Select[] = [
	new Select('Pending', 1),
	new Select('Launched', 2)
]

export const MovementType: Select[] = [
	new Select('Credit', 'C'),
	new Select('Debit', 'D')
]