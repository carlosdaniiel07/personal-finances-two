import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Account } from './account.model'
import { Movement } from './../movements/movements.model'

import { AuthService } from './../auth.service'

import { API_ENDPOINT } from './../app.api'

import { Util } from './../shared/util.functions'

@Injectable()
export class AccountService {
	constructor(private httpClient: HttpClient, private authService: AuthService){
	}

	// get all accounts
	getAccounts(): Observable<Account[]> {
		return this.httpClient.get<Account[]>(`${API_ENDPOINT}/accounts`, 
			{ headers: this.authService.getApiAuthHeader() })
	}

	// get an account by id
	getAccountById(id: number): Observable<Account>{
		return this.httpClient.get<Account>(`${API_ENDPOINT}/accounts/${id}`,
			{ headers: this.authService.getApiAuthHeader() })
	}

	// get all movements of an account
	getAccountMovements(accountId: number): Observable<Movement[]> {
		return this.httpClient.get<Movement[]>(`${API_ENDPOINT}/accounts/${accountId}/movements`,
			{ headers: this.authService.getApiAuthHeader() })
	}

	// insert an account
	insertAccount(account: Account): void {
		let data = JSON.stringify(account)

		this.httpClient.post(`${API_ENDPOINT}/accounts`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Account inserted!'))
	}

	// update an account
	updateAccount(account: Account): void {
		let data = JSON.stringify(account)

		this.httpClient.put(`${API_ENDPOINT}/accounts`, data, { headers: this.authService.getApiAuthHeader() })
			.subscribe(() => Util.successNotify('Account updated!'))
	}

	deleteAccount(accountId: number): Observable<Account> {
		return this.httpClient.delete<Account>(`${API_ENDPOINT}/accounts/${accountId}`,
			{ headers: this.authService.getApiAuthHeader() })
	}
}