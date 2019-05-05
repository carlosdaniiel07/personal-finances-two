import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Observable } from 'rxjs'

import { Project } from './../project.model'

import { ProjectService } from './../project.service'

import { Util } from './../../shared/util.functions'  

@Component({
  selector: 'finances-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {
  newProjectForm: FormGroup  
  todayDate = Date.now()

  constructor(private service: ProjectService) { }

  ngOnInit() {
  	this.initForm()
  }

  public newProject(): void {
  	let project = new Project(undefined, this.name.value, this.startDate.value, 
  		undefined, this.description.value, true, Util.toDateFormat(this.finishDate.value), 
      this.budget.value)

  	this.service.insertProject(project)
  	this.initForm()
  }

  private initForm(): void {
  	this.newProjectForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		startDate: new FormControl(''),
  		finishDate: new FormControl(''),
  		budget: new FormControl(''),
  		description: new FormControl('')
  	})
  }

  get name() { return this.newProjectForm.get('name') }
  get startDate() { return this.newProjectForm.get('startDate') }
  get finishDate() { return this.newProjectForm.get('finishDate') }
  get budget() { return this.newProjectForm.get('budget') }
  get description() { return this.newProjectForm.get('description') }
}
