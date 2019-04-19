import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { ProjectService } from './project.service'

import { Project } from './project.model' 

@Component({
  selector: 'finances-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>

  constructor(private service: ProjectService) { }

  ngOnInit() {
  	this.projects = this.service.getAllProjects()
  }
}
