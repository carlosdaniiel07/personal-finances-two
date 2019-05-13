import { Routes } from '@angular/router'

import { RouteGuard } from './route-guard'

import { LoginComponent } from './login/login.component'

import { DashboardComponent } from './dashboard/dashboard.component'

import { AccountsComponent } from './accounts/accounts.component'
import { AccountDetailsComponent } from './accounts/account-details/account-details.component'
import { EditAccountComponent } from './accounts/edit-account/edit-account.component'
import { NewAccountComponent } from './accounts/new-account/new-account.component'

import { MovementsComponent } from './movements/movements.component'
import { NewMovementComponent } from './movements/new-movement/new-movement.component'
import { MovementDetailsComponent } from './movements/movement-details/movement-details.component'
import { EditMovementComponent } from './movements/edit-movement/edit-movement.component'

import { CategoriesComponent } from './categories/categories.component'
import { CategoryDetailsComponent } from './categories/category-details/category-details.component'
import { CategorySubcategoriesComponent } from './categories/category-details/category-subcategories/category-subcategories.component'
import { CategoryMovementsComponent } from './categories/category-details/category-movements/category-movements.component'
import { NewCategoryComponent } from './categories/new-category/new-category.component'
import { EditCategoryComponent } from './categories/edit-category/edit-category.component'

import { SubcategoriesComponent } from './subcategories/subcategories.component'
import { NewSubcategoryComponent } from './subcategories/new-subcategory/new-subcategory.component'
import { SubcategoryDetailsComponent } from './subcategories/subcategory-details/subcategory-details.component' 
import { EditSubcategoryComponent } from './subcategories/edit-subcategory/edit-subcategory.component'

import { ProjectsComponent } from './projects/projects.component'
import { ProjectDetailsComponent } from './projects/project-details/project-details.component'
import { NewProjectComponent } from './projects/new-project/new-project.component'
import { EditProjectComponent } from './projects/edit-project/edit-project.component'

import { CreditCardsComponent } from './credit-cards/credit-cards.component'
import { NewCreditCardComponent } from './credit-cards/new-credit-card/new-credit-card.component'
import { CreditCardDetailsComponent } from './credit-cards/credit-card-details/credit-card-details.component'
import { CreditCardMovementsComponent } from './credit-cards/credit-card-details/credit-card-movements/credit-card-movements.component'
import { CreditCardInvoicesComponent } from './credit-cards/credit-card-details/credit-card-invoices/credit-card-invoices.component'
import { EditCreditCardComponent } from './credit-cards/edit-credit-card/edit-credit-card.component'

import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component'
import { InvoiceDetailsPayComponent } from './invoices/invoice-details/invoice-details-pay/invoice-details-pay.component'
import { InvoiceDetailsPrintComponent } from './invoices/invoice-details/invoice-details-print/invoice-details-print.component'

import { TransfersComponent } from './transfers/transfers.component'

export const ROUTES: Routes = [
	{path: '', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
	{path: 'accounts', component: AccountsComponent, canActivate: [RouteGuard]},
	{path: 'accounts/:id', component: AccountDetailsComponent, canActivate: [RouteGuard]},
	{path: 'accounts/edit/:id', component: EditAccountComponent, canActivate: [RouteGuard]},
	{path: 'new-account', component: NewAccountComponent, canActivate: [RouteGuard]},	
	{path: 'movements', component: MovementsComponent, canActivate: [RouteGuard]},
	{path: 'movements/:id', component: MovementDetailsComponent, canActivate: [RouteGuard] },
	{path: 'new-movement', component: NewMovementComponent, canActivate: [RouteGuard]},
	{path: 'edit-movement/:id', component: EditMovementComponent, canActivate: [RouteGuard]},
	{path: 'categories', component: CategoriesComponent, canActivate: [RouteGuard]},
	{path: 'categories/:id', component: CategoryDetailsComponent, canActivate: [RouteGuard], children: [
		{path: '', redirectTo: 'movements', pathMatch: 'full'},
		{path: 'movements', component: CategoryMovementsComponent },
		{path: 'subcategories', component: CategorySubcategoriesComponent}
	]},
	{path: 'new-category',  component: NewCategoryComponent, canActivate: [RouteGuard]},
	{path: 'categories/edit/:id', component: EditCategoryComponent, canActivate: [RouteGuard]},
	{path: 'subcategories', component: SubcategoriesComponent, canActivate: [RouteGuard]},
	{path: 'new-subcategory', component: NewSubcategoryComponent, canActivate: [RouteGuard]},
	{path: 'subcategories/:id', component: SubcategoryDetailsComponent, canActivate: [RouteGuard]},
	{path: 'subcategories/edit/:id', component: EditSubcategoryComponent, canActivate: [RouteGuard]},
	{path: 'projects', component: ProjectsComponent, canActivate: [RouteGuard]},
	{path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [RouteGuard]},
	{path: 'new-project', component: NewProjectComponent, canActivate: [RouteGuard]},
	{path: 'projects/edit/:id', component: EditProjectComponent, canActivate: [RouteGuard]},
	{path: 'credit-cards', component: CreditCardsComponent, canActivate: [RouteGuard]},
	{path: 'new-credit-card', component: NewCreditCardComponent, canActivate: [RouteGuard]},
	{path: 'credit-cards/:id', component: CreditCardDetailsComponent, canActivate: [RouteGuard], children: [
		{path: '', redirectTo: 'invoices', pathMatch: 'full'},
		{path: 'invoices', component: CreditCardInvoicesComponent},
		{path: 'movements', component: CreditCardMovementsComponent}
	]},
	{path: 'credit-cards/edit/:id', component: EditCreditCardComponent, canActivate: [RouteGuard]},
	{path: 'transfers', component: TransfersComponent, canActivate: [RouteGuard]},
	{path: 'invoices/:id', component: InvoiceDetailsComponent, canActivate: [RouteGuard]},
	{path: 'invoices/:id/pay', component: InvoiceDetailsPayComponent, canActivate: [RouteGuard]},
	{path: 'invoices/:id/print', component: InvoiceDetailsPrintComponent, canActivate: [RouteGuard]}
]