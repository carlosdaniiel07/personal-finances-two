import { Select } from './../shared/select.model'

export class Project {
	constructor(
		public Id: number,
		public Name: string,
		public StartDate: string,
		public ProjectStatus: string,
		public Description: string,
		public Enabled: boolean,
		public FinishDate?: string,
		public Budget?: number
	) {}
}

export const ProjectStatus: Select[] = [
	new Select('InProgress', 1),
	new Select('Finished', 2),
	new Select('Stopped', 3),
	new Select('Canceled', 4)
]