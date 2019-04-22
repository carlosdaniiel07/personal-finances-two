import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { AccountService } from './../accounts/accounts.service'
import { CategoryService } from './../categories/category.service'
import { SubcategoryService } from './../subcategories/subcategory.service'
import { CreditCardService } from './../credit-cards/credit-card.service'
import { ProjectService } from './../projects/project.service'

import { Movement } from './movements.model'
import { Account } from './../accounts/account.model'
import { Category } from './../categories/category.model'
import { Subcategory } from './../subcategories/subcategory.model'
import { Project } from './../projects/project.model'
import { CreditCard } from './../credit-cards/credit-card.model'

@Injectable()
export class MovementService {
	constructor(
		private httpClient: HttpClient,
		private accountService: AccountService,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private projectService: ProjectService,
		private creditCardService: CreditCardService
	) {}

	// get an array of Movement
	public getMovements(): Observable<Movement[]> {
		return this.httpClient.get<Movement[]>(`${API_ENDPOINT}/movements`)
	}

	// get a Movement by Id
	public getMovementById(id: number): Observable<Movement> {
		return this.httpClient.get<Movement>(`${API_ENDPOINT}/movements/${id}`)
	}

	public getAllAccounts(): Observable<Account[]> {
		return this.accountService.getAccounts()
	}

	public getAllCategories(): Observable<Category[]> {
		return this.categoryService.getCategories()
	}

	public getAllSubcategories(): Observable<Subcategory[]> {
		return this.subcategoryService.getSubcategories()
	}

	public getAllProjects(): Observable<Project[]> {
		return this.projectService.getAllProjects()
	}

	public getAllCreditCards(): Observable<CreditCard[]> {
		return this.creditCardService.getCreditCards()
	}
 }