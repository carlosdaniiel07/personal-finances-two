import { Select } from './../shared/select.model'

export const AccountTypes: Select[] = [
	new Select('Checking', 1),
	new Select('Savings', 2),
	new Select('Salary', 3),
	new Select('Investment', 4),
	new Select('Wallet', 5)
]