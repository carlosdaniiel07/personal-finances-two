import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { AuthService } from './../auth.service'

import { Category } from './category.model'
import { Movement } from './../movements/movements.model'
import { Subcategory } from './../subcategories/subcategory.model'

import { Util } from './../shared/util.functions'

@Injectable()
export class CategoryService {
	constructor(private http: HttpClient, private authService: AuthService) {
	}

	// get all categories
	public getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(`${API_ENDPOINT}/categories`, 
			{ headers: this.authService.getApiAuthHeader() })
	}

	// get a category by id
	public getCategoryById(id: number): Observable<Category> {
		return this.http.get<Category>(`${API_ENDPOINT}/categories/${id}`,
			{ headers: this.authService.getApiAuthHeader() })
	} 

	// get category movements
	getCategoryMovements(categoryId: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/categories/${categoryId}/movements`,
			{ headers: this.authService.getApiAuthHeader() })
	}

	// get category subcategories
	getCategorySubcategories(categoryId: number): Observable<Subcategory[]> {
		return this.http.get<Subcategory[]>(`${API_ENDPOINT}/categories/${categoryId}/subcategories`, 
			{ headers: this.authService.getApiAuthHeader() })
	}

	// insert a category
	public insertCategory(category: Category): void {
		let data = JSON.stringify(category)

		this.http.post(`${API_ENDPOINT}/categories`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Category inserted!'))
	}

	// update a existing category
	public updateCategory(category: Category): void {
		let data = JSON.stringify(category)

		this.http.put(`${API_ENDPOINT}/categories`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Category updated!'))
	}

	public deleteCategory(categoryId: number): Observable<Category> {
		return this.http.delete<Category>(`${API_ENDPOINT}/categories/${categoryId}`,
			{ headers: this.authService.getApiAuthHeader() })
	}
}