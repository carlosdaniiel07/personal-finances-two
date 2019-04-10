import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'

import { AccountsComponent } from './accounts/accounts.component'
import { AccountDetailsComponent } from './accounts/account-details/account-details.component'
import { EditAccountComponent } from './accounts/edit-account/edit-account.component'
import { NewAccountComponent } from './accounts/new-account/new-account.component'

import { MovementsComponent } from './movements/movements.component'


export const ROUTES: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'accounts', component: AccountsComponent},
	{path: 'accounts/:id', component: AccountDetailsComponent},
	{path: 'accounts/edit/:id', component: EditAccountComponent},
	{path: 'new-account', component: NewAccountComponent},	
	{path: 'movements', component: MovementsComponent },
]