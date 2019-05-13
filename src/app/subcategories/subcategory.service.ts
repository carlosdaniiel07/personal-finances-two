import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Subcategory } from './subcategory.model'
import { Category } from './../categories/category.model'
import { Movement } from './../movements/movements.model' 

import {API_ENDPOINT} from './../app.api'

import { CategoryService } from './../categories/category.service'
import { AuthService } from './../auth.service'

import { Util } from './../shared/util.functions'

@Injectable()
export class SubcategoryService {
	constructor(private categoryService: CategoryService, private http: HttpClient, private authService: AuthService){
	}

	// get all categories
	public getCategories(): Observable<Category[]> {
		return this.categoryService.getCategories()
	}

	// get all subcategories
	public getSubcategories(): Observable<Subcategory[]> {
		return this.http.get<Subcategory[]>(`${API_ENDPOINT}/subcategories`, { headers: this.authService.getApiAuthHeader() })
	}

	// get a category by id
	public getSubcategoryById(id: number): Observable<Subcategory> {
		return this.http.get<Subcategory>(`${API_ENDPOINT}/subcategories/${id}`, { headers: this.authService.getApiAuthHeader() })
	}

	public getSubcategoryMovements(id: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/subcategories/${id}/movements`, { headers: this.authService.getApiAuthHeader() })
	}

	// insert a new subcategory
	public insertSubcategory(subcategory: Subcategory): void {
		let data = JSON.stringify(subcategory)

		this.http.post(`${API_ENDPOINT}/subcategories`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Category inserted!'))
	}

	// update a subcategory
	public updateSubcategory(subcategory: Subcategory): void {
		let data = JSON.stringify(subcategory)

		this.http.put(`${API_ENDPOINT}/subcategories`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Category updated!'))
	}

	// delete a subcategory
	public deleteSubcategory(subcategoryId: number): Observable<Subcategory> {
		return this.http.delete<Subcategory>(`${API_ENDPOINT}/subcategories/${subcategoryId}`, { headers: this.authService.getApiAuthHeader() })
	}
}