import { Routes } from '@angular/router'

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
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'accounts', component: AccountsComponent},
	{path: 'accounts/:id', component: AccountDetailsComponent},
	{path: 'accounts/edit/:id', component: EditAccountComponent},
	{path: 'new-account', component: NewAccountComponent},	
	{path: 'movements', component: MovementsComponent },
	{path: 'movements/:id', component: MovementDetailsComponent },
	{path: 'new-movement', component: NewMovementComponent},
	{path: 'edit-movement/:id', component: EditMovementComponent},
	{path: 'categories', component: CategoriesComponent },
	{path: 'categories/:id', component: CategoryDetailsComponent, children: [
		{path: '', redirectTo: 'movements', pathMatch: 'full'},
		{path: 'movements', component: CategoryMovementsComponent },
		{path: 'subcategories', component: CategorySubcategoriesComponent}
	]},
	{path: 'new-category',  component: NewCategoryComponent},
	{path: 'categories/edit/:id', component: EditCategoryComponent},
	{path: 'subcategories', component: SubcategoriesComponent},
	{path: 'new-subcategory', component: NewSubcategoryComponent},
	{path: 'subcategories/:id', component: SubcategoryDetailsComponent},
	{path: 'subcategories/edit/:id', component: EditSubcategoryComponent},
	{path: 'projects', component: ProjectsComponent},
	{path: 'projects/:id', component: ProjectDetailsComponent},
	{path: 'new-project', component: NewProjectComponent},
	{path: 'projects/edit/:id', component: EditProjectComponent},
	{path: 'credit-cards', component: CreditCardsComponent},
	{path: 'new-credit-card', component: NewCreditCardComponent},
	{path: 'credit-cards/:id', component: CreditCardDetailsComponent, children: [
		{path: '', redirectTo: 'invoices', pathMatch: 'full'},
		{path: 'invoices', component: CreditCardInvoicesComponent},
		{path: 'movements', component: CreditCardMovementsComponent}
	]},
	{path: 'credit-cards/edit/:id', component: EditCreditCardComponent},
	{path: 'transfers', component: TransfersComponent},
	{path: 'invoices/:id', component: InvoiceDetailsComponent},
	{path: 'invoices/:id/pay', component: InvoiceDetailsPayComponent}
]