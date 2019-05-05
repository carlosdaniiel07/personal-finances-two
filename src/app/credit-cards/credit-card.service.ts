import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { CreditCard } from './credit-card.model'
import { Invoice } from './../invoices/invoice.model'
import { Movement } from './../movements/movements.model'

import { InvoiceService } from './../invoices/invoice.service'

import { Util } from './../shared/util.functions'

@Injectable()
export class CreditCardService {
	constructor(private http: HttpClient, private invoiceService: InvoiceService){

	}

	// get all credit cards
	public getCreditCards(): Observable<CreditCard[]> {
		return this.http.get<CreditCard[]>(`${API_ENDPOINT}/credit-cards`)
	}

	// get all invoices of a credit card
	public getCreditCardInvoices(creditCardId: number): Observable<Invoice[]> {
		return this.http.get<Invoice[]>(`${API_ENDPOINT}/credit-cards/${creditCardId}/invoices`)
	}

	// get all movements of an invoice
	public getInvoiceMovements(invoiceId: number): Observable<Movement[]> {
		return this.invoiceService.getInvoiceMovements(invoiceId)
	}	

	// get a credit card by id
	public getCreditCardById(id: number): Observable<CreditCard> {
		return this.http.get<CreditCard>(`${API_ENDPOINT}/credit-cards/${id}`)
	}

	// insert a new credit card
	public insertCreditCard(creditCard: CreditCard): void {
		let data = JSON.stringify(creditCard)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.post(`${API_ENDPOINT}/credit-cards`, data, { headers: headers })
			.subscribe(() => Util.successNotify('Credit card inserted!'))
	}

	// update a credit card
	public updateCreditCard(creditCard: CreditCard): void {
		let data = JSON.stringify(creditCard)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.put(`${API_ENDPOINT}/credit-cards`, data, { headers: headers })
			.subscribe(() => Util.successNotify('Credit card updated!'))
	}

	// delete a credit card
	public deleteCreditCard(creditCardId: number): Observable<CreditCard> {
		return this.http.delete<CreditCard>(`${API_ENDPOINT}/credit-cards/${creditCardId}`)
	}
}	