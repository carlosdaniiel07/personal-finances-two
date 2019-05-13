import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { AccountService } from './../accounts/accounts.service'
import { CategoryService } from './../categories/category.service'
import { SubcategoryService } from './../subcategories/subcategory.service'
import { CreditCardService } from './../credit-cards/credit-card.service'
import { ProjectService } from './../projects/project.service'
import { AuthService } from './../auth.service'

import { Movement } from './movements.model'
import { Account } from './../accounts/account.model'
import { Category } from './../categories/category.model'
import { Subcategory } from './../subcategories/subcategory.model'
import { Project } from './../projects/project.model'
import { CreditCard } from './../credit-cards/credit-card.model'

import { Util } from './../shared/util.functions'

@Injectable()
export class MovementService {
	constructor(
		private httpClient: HttpClient,
		private accountService: AccountService,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private projectService: ProjectService,
		private creditCardService: CreditCardService,
		private authService: AuthService
	) {}

	// get an array of Movement
	public getMovements(): Observable<Movement[]> {
		return this.httpClient.get<Movement[]>(`${API_ENDPOINT}/movements`, { headers: this.authService.getApiAuthHeader() })
	}

	// get a Movement by Id
	public getMovementById(id: number): Observable<Movement> {
		return this.httpClient.get<Movement>(`${API_ENDPOINT}/movements/${id}`, { headers: this.authService.getApiAuthHeader() })
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

	// insert a new movement
	public insertMovement(movement: any): Observable<Movement> {
		let data = JSON.stringify(movement)

		return this.httpClient.post<Movement>(`${API_ENDPOINT}/movements`, data,
			{ headers: this.authService.getApiAuthHeader() })
	}

	// update a movement
	public updateMovement(movement: any): void {
		let data = JSON.stringify(movement)

		this.httpClient.put(`${API_ENDPOINT}/movements`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Movement updated!'))
	}

	// delete a movement
	public deleteMovement(movementId: number): Observable<Movement> {
		return this.httpClient.delete<Movement>(`${API_ENDPOINT}/movements/${movementId}`, { headers: this.authService.getApiAuthHeader() })
	}

	// launch movement
	public launchMovement(movementId: number): Observable<Movement> {
		return this.httpClient.put<Movement>(`${API_ENDPOINT}/movements/launch/${movementId}`, null, { headers: this.authService.getApiAuthHeader() })
	}
 }