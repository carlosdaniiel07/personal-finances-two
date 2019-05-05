import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs'

import { ProjectService } from './project.service'

import { Project } from './project.model' 

import { Util } from './../shared/util.functions'

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

  public deleteProject(project: Project): void {
  	Util.confirmNotify(`Do you realy want to delete the project ${project.Name}`).then((value) => {
      if(value){
        this.projects.subscribe((data: Project[]) => {
          data.splice(data.indexOf(project), 1)
          this.projects = of(data)
        })

        this.service.deleteProject(project.Id).subscribe()
      }
    })
  }
}
