import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Subcategory } from './subcategory.model'
import { Category } from './../categories/category.model'
import { Movement } from './../movements/movements.model' 

import {API_ENDPOINT} from './../app.api'

import { CategoryService } from './../categories/category.service'

@Injectable()
export class SubcategoryService {
	constructor(private categoryService: CategoryService, private http: HttpClient){
	}

	// get all categories
	public getCategories(): Observable<Category[]> {
		return this.categoryService.getCategories()
	}

	// get all subcategories
	public getSubcategories(): Observable<Subcategory[]> {
		return this.http.get<Subcategory[]>(`${API_ENDPOINT}/subcategories`)
	}

	// get a category by id
	public getSubcategoryById(id: number): Observable<Subcategory> {
		return this.http.get<Subcategory>(`${API_ENDPOINT}/subcategories/${id}`)
	}

	public getSubcategoryMovements(id: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/subcategories/${id}/movements`)
	}

	// insert a new subcategory
	public insertSubcategory(subcategory: Subcategory): void {
		let data = JSON.stringify(subcategory)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.post(`${API_ENDPOINT}/subcategories`, data, { headers: headers })
			.subscribe(() => alert('Objeto inserido com sucesso!'))
	}

	// update a subcategory
	public updateSubcategory(subcategory: Subcategory): void {
		let data = JSON.stringify(subcategory)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.put(`${API_ENDPOINT}/subcategories`, data, { headers: headers })
			.subscribe(() => alert('Objeto atualizado com sucesso!'))
	}

	// delete a subcategory
	public deleteSubcategory(subcategoryId: number): Observable<Subcategory> {
		return this.http.delete<Subcategory>(`${API_ENDPOINT}/subcategories/${subcategoryId}`)
	}
}