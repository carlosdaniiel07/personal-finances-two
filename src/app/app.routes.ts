import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'

import { AccountsComponent } from './accounts/accounts.component'
import { AccountDetailsComponent } from './accounts/account-details/account-details.component'
import { EditAccountComponent } from './accounts/edit-account/edit-account.component'
import { NewAccountComponent } from './accounts/new-account/new-account.component'

import { MovementsComponent } from './movements/movements.component'

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

export const ROUTES: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'accounts', component: AccountsComponent},
	{path: 'accounts/:id', component: AccountDetailsComponent},
	{path: 'accounts/edit/:id', component: EditAccountComponent},
	{path: 'new-account', component: NewAccountComponent},	
	{path: 'movements', component: MovementsComponent },
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
	{path: 'projects', component: ProjectsComponent}
]