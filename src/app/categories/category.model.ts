export class Category {
	constructor(
		public Id: number,
		public Name: string,
		public Type: string,
		public Enabled: boolean,
		public CanEdit: boolean
	){}
}