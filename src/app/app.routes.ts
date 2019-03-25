import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'
import { AccountsComponent } from './accounts/accounts.component'

export const ROUTES: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'accounts', component: AccountsComponent}
]