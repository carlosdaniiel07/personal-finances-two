import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { Category } from './category.model'
import { Movement } from './../movements/movements.model'
import { Subcategory } from './../subcategories/subcategory.model'

@Injectable()
export class CategoryService {
	constructor(private http: HttpClient) {
	}

	// get all categories
	public getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(`${API_ENDPOINT}/categories`)
	}

	// get a category by id
	public getCategoryById(id: number): Observable<Category> {
		return this.http.get<Category>(`${API_ENDPOINT}/categories/${id}`)
	} 

	// get category movements
	getCategoryMovements(categoryId: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/categories/${categoryId}/movements`)
	}

	// get category subcategories
	getCategorySubcategories(categoryId: number): Observable<Subcategory[]> {
		return this.http.get<Subcategory[]>(`${API_ENDPOINT}/categories/${categoryId}/subcategories`)
	}

	// insert a category
	public insertCategory(category: Category): void {
		let data = JSON.stringify(category)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.post(`${API_ENDPOINT}/categories`, data, { headers: headers })
			.subscribe(() => alert('Objeto inserido com sucesso!'))
	}

	// update a existing category
	public updateCategory(category: Category): void {
		let data = JSON.stringify(category)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.put(`${API_ENDPOINT}/categories`, data, { headers: headers })
			.subscribe(() => alert('Objeto atualizado com sucesso!'))
	}

	public deleteCategory(categoryId: number): Observable<Category> {
		return this.http.delete<Category>(`${API_ENDPOINT}/categories/${categoryId}`)
	}
}