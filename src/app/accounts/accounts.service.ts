import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Account } from './account.model'
import { Movement } from './../movements/movements.model'

import { API_ENDPOINT } from './../app.api'

@Injectable()
export class AccountService {
	constructor(private httpClient: HttpClient){

	}

	// get all accounts
	getAccounts(): Observable<Account[]> {
		return this.httpClient.get<Account[]>(`${API_ENDPOINT}/accounts`)
	}

	// get an account by id
	getAccountById(id: number): Observable<Account>{
		return this.httpClient.get<Account>(`${API_ENDPOINT}/accounts/${id}`)
	}

	// get all movements of an account
	getAccountMovements(accountId: number): Observable<Movement[]> {
		return this.httpClient.get<Movement[]>(`${API_ENDPOINT}/accounts/${accountId}/movements`)
	}

	// insert an account
	insertAccount(account: Account): void {
		let data = JSON.stringify(account)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.httpClient.post(`${API_ENDPOINT}/accounts`, data, { headers: headers })
			.subscribe(() => alert('Objeto inserido com sucesso!'))
	}

	// update an account
	updateAccount(account: Account): void {
		let data = JSON.stringify(account)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.httpClient.put(`${API_ENDPOINT}/accounts`, data, { headers: headers })
			.subscribe(() => alert('Objeto atualizado com sucesso!'))
	}

	deleteAccount(accountId: number): Observable<Account> {
		return this.httpClient.delete<Account>(`${API_ENDPOINT}/accounts/${accountId}`)
	}
}