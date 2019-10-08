import { Component, OnInit } from '@angular/core';
import { SubTask } from '../SubTask';
import { Step } from '../Step';
import { DataService } from '../data.service';
import {Task} from 'src/app/Task';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  currentTask : Task;
  currentSubTask : SubTask; 
  step: Step;
  subTask : SubTask;
  displaySteps: Step[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentTask.subscribe(activeTask => this.currentTask = activeTask);
    this.data.currentSubTask.subscribe(activeSubTask => this.currentSubTask = activeSubTask);
    this.data.getUpdate();
  }

  /**
   * It shows the seleted sub task in steps menu for adding steps
   * @param subTask - The selected sub task
   */
  public showStepsMenu(subTask:SubTask) {
    this.currentSubTask = subTask;
    this.data.updateSubTask(this.currentSubTask);
    this.subTask = subTask;
  }

  /**
   * It saves a step inside the current sub task
   * @param e - The input element containing the step name 
   */
  public saveStep(e) {
    if(e.keyCode == 13 && e.target.value != "") {
      let stepName = e.target.value;
      this.displaySteps = this.currentSubTask.steps;
      this.step = {id: Date.now(), name: stepName, isAvailable: true, isDeleted: false};
      e.target.value = "";
      this.currentSubTask.steps.push(this.step);
      this.data.updateTask(this.currentTask);
      this.data.updateSubTask(this.currentSubTask);
      this.data.setUpdate(this.currentTask);
    }
  }

  /**
   * It changes the status of the step to true or false
   * @param step - The step whoose status has to be changes
   */
  public changeStepStatus(step:Step) {
    console.log(step.id);
    let activeStep = this.currentSubTask.steps.find(({id}) => id == step.id);
    console.log(activeStep);
    if(activeStep.isAvailable) 
     activeStep.isAvailable = false;
    else
     activeStep.isAvailable = true;
  }

  /**
   * It deletes the step as selected
   * @param step - The step to be deleted 
   */
  public deleteStep(step:Step) {
    let index = this.currentSubTask.steps.indexOf(step);
    this.currentSubTask.steps.splice(index,1);
  }

  /**
   * It toggles the steps menu on click
   */
  public toggleSteps() {
    this.currentSubTask = null;
  }
}