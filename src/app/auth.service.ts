import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

import { API_ENDPOINT } from './app.api'

import { Util } from './shared/util.functions'
import { User } from './login/user.model'

@Injectable()
export class AuthService {
	private	authenticated: boolean = false
	
	private currentUserNickname: string
	private apiAuthToken: string

	public authEvent = new EventEmitter<boolean>()

	constructor(private http:HttpClient, private router: Router) {
	}

	public isAuthenticated(): boolean {
		return this.authenticated
	}

	public auth(object: any): void {
		let data = JSON.stringify(object)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')
	
		this.http.post<User>(`${API_ENDPOINT}/auth`, data, { headers: headers })
		.subscribe(
			(user: User) => {
				this.apiAuthToken = user.Token
				this.currentUserNickname = object.Nickname

				this.authenticated = true
				this.authEvent.emit(this.authenticated)
				this.router.navigateByUrl('/dashboard')}
		)
	}

	public logout(redirectToLoginPage: boolean = true): void {
		this.authenticated = false
		this.authEvent.emit(false)

		if(redirectToLoginPage){
			this.router.navigateByUrl('/login')
		}
	}

	public getApiAuthToken(): string {
		return this.apiAuthToken
	}

	public getCurrentUserNickname(): string {
		return this.currentUserNickname
	}

	public getApiAuthHeader(): HttpHeaders {
		return new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('token', this.getApiAuthToken())
	}
}