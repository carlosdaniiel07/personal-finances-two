import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs'

import { Project } from './../project.model' 

@Component({
  selector: 'finances-projects-table',
  templateUrl: './projects-table.component.html'
})
export class ProjectsTableComponent implements OnInit {
  @Input() projects: Observable<Project[]>

  constructor() { }

  ngOnInit() {
  }

}
