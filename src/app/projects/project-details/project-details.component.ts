import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Project } from './../project.model'
import { Movement } from './../../movements/movements.model'

import { ProjectService } from './../project.service'

import { Util } from './../../shared/util.functions'

@Component({
  selector: 'finances-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  projectDetailsForm: FormGroup
  
  project: Project
  movements: Observable<Movement[]>

  constructor(private service: ProjectService, private activatedRoute: ActivatedRoute
  	, private router: Router) { }

  ngOnInit() {
  	this.loadData()
  }

  public deleteProject(): void {
    Util.confirmNotify('Do you realy want to delete this projcet?').then((value) => {
      if(value){
        this.service.deleteProject(this.project.Id).subscribe(() => {
          Util.successNotify('Project deleted!')
          this.router.navigateByUrl('/projects')
        })
      }
    })
  }

  private loadData(): void {
  	this.initForm()
   
    let projectId: number = this.activatedRoute.snapshot.params['id']
    
    this.service.getProjectById(projectId).subscribe((response: Project) => {
    	this.project = response
    	this.loadForm(response)
    })
    
    this.movements = this.service.getProjectMovements(projectId)
  }

  private initForm(): void {
  	this.projectDetailsForm = new FormGroup({
  		name: new FormControl(''),
  		startDate: new FormControl(''),
  		finishDate: new FormControl(''),
  		status: new FormControl(''),
  		budget: new FormControl(''),
  		leftBudget: new FormControl(''),
  		description: new FormControl('')
  	})
  }

  private loadForm(project: Project): void {
  	this.name.setValue(project.Name)
  	this.startDate.setValue(project.StartDate)
  	this.finishDate.setValue(project.FinishDate)
  	this.status.setValue(project.ProjectStatus)
  	this.budget.setValue(project.Budget)
  	this.leftBudget.setValue(project.Budget)
  	this.description.setValue(project.Description)
  }

  get name() { return this.projectDetailsForm.get('name') }
  get startDate() { return this.projectDetailsForm.get('startDate') }
  get finishDate() { return this.projectDetailsForm.get('finishDate') }
  get status() { return this.projectDetailsForm.get('status') }
  get budget() { return this.projectDetailsForm.get('budget') }
  get leftBudget() { return this.projectDetailsForm.get('leftBudget') }
  get description() { return this.projectDetailsForm.get('description') }
}
