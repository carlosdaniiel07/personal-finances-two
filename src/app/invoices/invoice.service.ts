import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { Invoice } from './invoice.model'
import { Account } from './../accounts/account.model'
import { Movement } from './../movements/movements.model'

import { AccountService } from './../accounts/accounts.service'
import { AuthService } from './../auth.service'

@Injectable()
export class InvoiceService {
	constructor(private http: HttpClient, private accountService: AccountService, private authService: AuthService) {
	}

	// get all accounts
	public getAllAccounts(): Observable<Account[]> {
		return this.accountService.getAccounts()
	}

	// get an invoice by id
	public getInvoiceById(id: number): Observable<Invoice> {
		return this.http.get<Invoice>(`${API_ENDPOINT}/invoices/${id}`, { headers: this.authService.getApiAuthHeader() })
	}

	// get movements of an invoice
	public getInvoiceMovements(invoiceId: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/invoices/${invoiceId}/movements`, { headers: this.authService.getApiAuthHeader() })
	}

	// close an invoice
	public closeInvoice(invoiceId: number): Observable<Invoice> {
		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/close/${invoiceId}`, null, 
			{ headers: this.authService.getApiAuthHeader() })
	}

	// open a closed invoice
	public openInvoice(invoiceId: number): Observable<Invoice> {
		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/open/${invoiceId}`, null,
			{ headers: this.authService.getApiAuthHeader() })
	}	

	// pay an invoice
	public payInvoice(invoiceId: number, object: any): Observable<Invoice> {
		let data = JSON.stringify(object)
		
		return this.http.put<Invoice>(`${API_ENDPOINT}/invoices/pay/${invoiceId}`, data,
			{ headers: this.authService.getApiAuthHeader() })
	}
}