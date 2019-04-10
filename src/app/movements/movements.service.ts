import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Movement } from './movements.model'
import { API_ENDPOINT } from './../app.api'

@Injectable()
export class MovementService {
	constructor(private httpClient: HttpClient) {
		
	}

	// get an array of Movement
	getMovements(): Observable<Movement[]> {
		return this.httpClient.get<Movement[]>(`${API_ENDPOINT}/movements`)
	}

	// get a Movement by Id
	getMovementById(id: number): Observable<Movement> {
		return this.httpClient.get<Movement>(`${API_ENDPOINT}/movements/${id}`)
	}
}