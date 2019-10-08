import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Task} from 'src/app/Task';
import {SubTask} from 'src/app/SubTask';
import {Step} from 'src/app/Step';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  task: Task;
  private activeTask = new BehaviorSubject(this.task);
  currentTask = this.activeTask.asObservable();

  subTask: SubTask;
  private activeSubTask = new BehaviorSubject(this.subTask);
  currentSubTask = this.activeSubTask.asObservable();

  step: Step;
  private activeStep = new BehaviorSubject(this.step);
  currentStep = this.activeStep.asObservable();

  constructor() { }

  updateTask(newTask: Task) {
    this.activeTask.next(newTask);
  }

  updateSubTask(newSubTask: SubTask) {
    this.activeSubTask.next(newSubTask);
  }

  updateStep(newStep: Step) {
    this.activeStep.next(newStep);
  }

  setUpdate(data){ 
    this.currentTask = data;   
  }
  
  getUpdate(){
    return this.currentTask;
  }
}

