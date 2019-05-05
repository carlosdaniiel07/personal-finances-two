import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { Invoice } from './invoice.model'
import { Account } from './../accounts/account.model'
import { Movement } from './../movements/movements.model'

import { AccountService } from './../accounts/accounts.service'

@Injectable()
export class InvoiceService {
	constructor(private http: HttpClient, private accountService: AccountService) {
	}

	// get all accounts
	public getAllAccounts(): Observable<Account[]> {
		return this.accountService.getAccounts()
	}

	// get an invoice by id
	public getInvoiceById(id: number): Observable<Invoice> {
		return this.http.get<Invoice>(`${API_ENDPOINT}/invoices/${id}`)
	}

	// get movements of an invoice
	public getInvoiceMovements(invoiceId: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/invoices/${invoiceId}/movements`)
	}

	// close an invoice
	public closeInvoice(invoiceId: number): Observable<Invoice> {
		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/close/${invoiceId}`, null, { headers: null })
	}

	// open a closed invoice
	public openInvoice(invoiceId: number): Observable<Invoice> {
		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/open/${invoiceId}`, null, { headers: null })
	}	

	// pay an invoice
	public payInvoice(invoiceId: number, object: any): Observable<Invoice> {
		let data = JSON.stringify(object)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/pay/${invoiceId}`, data, { headers: headers })
	}
}