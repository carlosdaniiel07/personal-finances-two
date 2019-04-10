export class Account {
	constructor(
		public Id: number,
		public Name: string, 
		public AccountType: string, 
		public InitialBalance: number, 
		public Balance: number, 
		public Enabled: boolean
	) {}
}