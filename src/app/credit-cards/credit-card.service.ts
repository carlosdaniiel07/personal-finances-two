import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { CreditCard } from './credit-card.model'

@Injectable()
export class CreditCardService {
	constructor(private http: HttpClient){

	}

	// get all credit cards
	public getCreditCards(): Observable<CreditCard[]> {
		return this.http.get<CreditCard[]>(`${API_ENDPOINT}/credit-cards`)
	}

	// get a credit card by id
	public getCreditCardById(id: number): Observable<CreditCard> {
		return this.http.get<CreditCard>(`${API_ENDPOINT}/credit-cards/${id}`)
	}
}	