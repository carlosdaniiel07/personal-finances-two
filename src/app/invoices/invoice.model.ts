import { Movement } from './../movements/movements.model'
import { CreditCard } from './../credit-cards/credit-card.model'
import { Select } from './../shared/select.model'

export class Invoice {
	constructor(
		public Id: number,
		public Reference: string,
		public MaturityDate: string,
		public Closed: boolean,
		public InvoiceStatus: string,
		public CreditCard: CreditCard,
		public CreditCardId: number,
		public TotalValue: number,
		public PaymentDate?: string,
		public Movements?: Movement[]
	) 
	{}
}

export const InvoiceStatus: Select[] = [
	new Select('Not closed', 1),
	new Select('Pending', 2),
	new Select('Paid', 3)
]