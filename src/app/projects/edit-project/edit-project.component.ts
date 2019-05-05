import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { Project, ProjectStatus } from './../project.model'
import { Select } from './../../shared/select.model'

import { ProjectService } from './../project.service'

import { Util } from './../../shared/util.functions'  

@Component({
  selector: 'finances-edit-project',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {
  updateProjectForm: FormGroup 
  project: Project

  constructor(private service: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData()
  }

  public updateProject(): void {
    let project = new Project(this.project.Id, this.name.value, 
      this.project.StartDate,  this.status.value, this.description.value, true, 
      Util.toDateFormat(this.finishDate.value), this.budget.value)

    this.service.updateProject(project)
  }

  private loadData(): void {
    this.initForm()
    this.service.getProjectById(this.route.snapshot.params['id']).subscribe((response: Project) => {
      this.project = response
      this.loadForm(response)
    })
  }

  public getAvailableProjectStatus(): Select[] {
    return ProjectStatus
  }

  private loadForm(project: Project): void {
    this.name.setValue(project.Name)
    this.startDate.setValue(project.StartDate)
    this.finishDate.setValue(project.FinishDate)
    this.budget.setValue(project.Budget)
    this.status.setValue(this.getAvailableProjectStatus()
        .find(p => p.label === project.ProjectStatus).value)
    this.description.setValue(project.Description)
  }

  private initForm(): void {
  	this.updateProjectForm = new FormGroup({
  		name: new FormControl('', Validators.required),
  		startDate: new FormControl(''),
  		finishDate: new FormControl(''),
  		budget: new FormControl(''),
  		status: new FormControl('', Validators.required),
  		description: new FormControl('')
  	})
  }

  get name() { return this.updateProjectForm.get('name') }
  get startDate() { return this.updateProjectForm.get('startDate') }
  get finishDate() { return this.updateProjectForm.get('finishDate') }
  get budget() { return this.updateProjectForm.get('budget') }
  get status() { return this.updateProjectForm.get('status') }
  get description() { return this.updateProjectForm.get('description') }

}
