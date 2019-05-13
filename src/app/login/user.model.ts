export class User {
	constructor(
		public Id: number,
		public Name: string,
		public Nickname: string,
		public Email: string,
		public Password: string,
		public Token: string,
		public Enabled: boolean
	) {
	}
}