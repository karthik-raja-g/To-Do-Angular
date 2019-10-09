import { Component, OnInit, Input } from '@angular/core';
import { AllTasks } from '../tasks';
import {Task} from 'src/app/Task';
import {CategoryService} from "src/app/category-service.service";
import {TasksComponent} from "src/app/tasks/tasks.component";
import {Utils} from 'src/app/utils/utils';
import { DataService } from "../data.service";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  tasks: AllTasks = {allTasks: []};
  categoryService = new CategoryService;
  currentTask:Task;
  tasksComponent = new TasksComponent(this.data);
  commonUtils = new Utils;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentTask.subscribe(currentTask => this.currentTask = currentTask)
  }

  /**
   * It adds a new category or a task to the to do list
   * @param e - The element containig the entered name of task
   */
  public addCategory(e) {
    if(e.keyCode == 13 && e.target.value != "") {
      this.currentTask = this.categoryService.addTask(e.target.value)
      this.tasks.allTasks.push(this.currentTask);
      this.data.updateTask(this.currentTask);
      e.target.value ="";
    }

  }

  /**
   * It toggles the main menu inside out when clicked
   * @param e - The indicator element with current status of the menu
   */
  public toggle(e) {
    let tasks = document.querySelector(".tasks");
    if(e.target.value === "open") {
        e.target.value = "close";
        this.commonUtils.mapAttributes(document.querySelector(".menu"),[["class","menu menuClosed"]]);
        this.commonUtils.mapAttributes(document.querySelector(".tasks"),[["class","tasks tasksClosed"]]);
    }
    else {
        e.target.value = "open";
        this.commonUtils.mapAttributes(document.querySelector(".menu"),[["class","menu"]]);
        this.commonUtils.mapAttributes(document.querySelector(".tasks"),[["class","tasks"]]);
    }   

  }

  /**
   * It adds sub tasks to the selected task, clicked by the user
   * @param task - The task clicked by the user
   */
  public addSubTask(task: Task) {
    this.data.updateTask(task);
    this.tasksComponent.addSubTask(task);
  }
}
