import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { Project } from './project.model'

@Injectable()
export class ProjectService {
	constructor(private http: HttpClient){
	}

	// get all projects
	public getAllProjects(): Observable<Project[]> {
		return this.http.get<Project[]>(`${API_ENDPOINT}/projects`)
	}

	// get a project by id
	public getProjectById(projectId: number): Observable<Project> {
		return this.http.get<Project>(`${API_ENDPOINT}/projects/${projectId}`)	
	}
}