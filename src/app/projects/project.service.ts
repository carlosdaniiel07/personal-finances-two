import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { API_ENDPOINT } from './../app.api'

import { Project } from './project.model'
import { Movement } from './../movements/movements.model'

import { Util } from './../shared/util.functions'

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

	// insert a new project
	public insertProject(project: Project): void {
		let data = JSON.stringify(project)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')
		
		this.http.post(`${API_ENDPOINT}/projects`, data, { headers: headers })
			.subscribe(() => Util.successNotify('Project inserted!'))
	}

	// update an existing project
	public updateProject(project: Project): void {
		let data = JSON.stringify(project)
		let headers = new HttpHeaders().append('Content-Type', 'application/json')

		this.http.put(`${API_ENDPOINT}/projects`, data, { headers: headers })
			.subscribe(() => Util.successNotify('Project updated!'))
	}

	// get project movements
	public getProjectMovements(projectId: number): Observable<Movement[]> {
		return this.http.get<Movement[]>(`${API_ENDPOINT}/projects/${projectId}/movements/`)	
	}

	// delete a project
	public deleteProject(projectId: number): Observable<Project> {
		return this.http.delete<Project>(`${API_ENDPOINT}/projects/${projectId}`)
	}
}