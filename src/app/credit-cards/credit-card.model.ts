export class CreditCard {
	constructor(
		public Id: number,
		public Name: string,
		public InvoiceClosure: string,
		public PayDay: string,
		public Limit: number,
		public Enabled: boolean,
		public RemainingLimit?: number 
	) {}
}