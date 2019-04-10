export interface Movement {
	Id: number
	Type: string
	Description: string
	Value: number
	Increase?: number
	Decrease?: number
	InclusionDate: string
	AccountingDate: string
	Observation: string
	CanEdit: boolean
	AutomaticallyLaunch: boolean
	MovementStatus: string
}