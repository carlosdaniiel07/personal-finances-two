import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'

export const ROUTES: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent}
]