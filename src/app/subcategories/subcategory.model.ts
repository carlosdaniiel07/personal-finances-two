import { Category } from './../categories/category.model'

export class Subcategory {
	constructor(
		public Id: number,	
		public Name: string,
		
		public Category: Category,
		public CategoryId: number,

		public CanEdit: boolean,
		public Enabled: boolean 
	){}
}