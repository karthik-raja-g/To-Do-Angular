import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/Task';
import {Utils} from 'src/app/utils/utils';
import { DataService } from "../data.service";
import { SubTask } from '../SubTask';
import {StepsComponent} from "src/app/steps/steps.component";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private data: DataService) { }

  currentTask : Task;
  currentSubTask : SubTask; 
  subTask : SubTask;
  displaySubTasks: SubTask[];
  stepsComponent = new StepsComponent(this.data);

  ngOnInit() {
    this.data.currentTask.subscribe(activeTask => this.currentTask = activeTask);
    this.data.currentSubTask.subscribe(activeSubTask => this.currentSubTask = activeSubTask);
    this.data.getUpdate();
  }

  /**
   * It shows the task addition option when clicked on the category
   * @param task - The task selected by the user
   */
  public addSubTask(task:Task) {
    this.currentTask = task;
  }

  /**
   * It saves the sub task inside the selected main task
   * @param e - The element containig sub task name entered by user
   */
  public saveSubTask(e) {
    this.displaySubTasks = this.currentTask.subtasks;
    if(e.keyCode == 13 && e.target.value != "") {
      this.subTask = {id: Date.now(), info: e.target.value, isAvailable: true, isDeleted: false, steps: [],notes: ""};
      e.target.value = "";
      this.currentTask.subtasks.push(this.subTask);
      this.data.updateTask(this.currentTask);
      this.data.updateSubTask(this.currentSubTask);
      this.data.setUpdate(this.currentTask);
      
    }
  }

  /**
   * It changes the status of sub task on clicking. A completed task will have a strike mark
   * @param sub - The subtask whoose status has to be changed
   */
  public changeSubTaskStatus(sub:SubTask) {
    let subTask = this.currentTask.subtasks.find(({id}) => id == sub.id);
    if(subTask.isAvailable) 
      subTask.isAvailable = false;
    else
      subTask.isAvailable = true;
  }

  /**
   * It adds steps to a selected sub task
   * @param subTask - The sub task to which steps are to be added 
   */
  public showStepsMenu(subTask:SubTask) {
    this.stepsComponent.showStepsMenu(subTask);
  }

}
