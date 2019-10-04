import { Component, OnInit, Input } from '@angular/core';
//import {  } from '../tasks/tasks.component';
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

  taskName : string;
  tasks : Task[] = [];
  categoryService = new CategoryService;
  currentTask:Task;
  tasksComponent = new TasksComponent(this.data);
  commonUtils = new Utils;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.activeTask.subscribe(currentTask => this.currentTask = this.currentTask)
  }

  public addCategory(e) {
    console.log(e.target.value);
    console.log(e.keyCode);
    if(e.keyCode == 13 && e.target.value != "") {
      console.log(this.taskName + "$$$$$");
      this.tasks.push(this.categoryService.addTask(e.target.value));
      console.log(this.categoryService.addTask(e.target.value));
      console.log(this.tasks);
      e.target.value ="";
      e.target.id;
    }

  }

  public toggle(e) {
    let tasks = document.querySelector(".tasks");
    console.log(e.target.value)
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

  public addTasks(e) {
    console.log(e.target.id+"****");
    this.tasksComponent.addTask(e,this.tasks);
  }

}
