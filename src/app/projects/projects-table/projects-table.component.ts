import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'

import { Project } from './../project.model' 

@Component({
  selector: 'finances-projects-table',
  templateUrl: './projects-table.component.html'
})
export class ProjectsTableComponent implements OnInit {
  @Input() projects: Observable<Project[]>
  @Output() deleteProjectEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  public deleteProject(project: Project): void {
  	this.deleteProjectEvent.emit(project)
  }
}
