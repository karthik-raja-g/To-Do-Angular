import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import {Task} from 'src/app/Task';
import {Utils} from 'src/app/utils/utils';
import { DataService } from "../data.service";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private data: DataService) { }

  commonUtils = new Utils;
  currentTask = Task;
  taskName : string;

  ngOnInit() {
    this.data.activeTask.subscribe(currentTask => this.currentTask = this.currentTask)
  }

  public addTask(e,tasks:Task[]) {
    console.log(tasks);
    let index = e.target.id;
    let totalTasks;
    let completedTasks;
    let taskInfo = document.querySelector(".taskDetails");
    let tasksBody = document.querySelector(".tasks");
    let header = document.querySelector(".subTaskHeader");
    console.log(tasksBody.lastChild+"!!!!!");
    this.commonUtils.clearContent(taskInfo);
    this.commonUtils.clearContent(tasksBody.lastChild);
    this.commonUtils.clearContent(document.querySelector(".subTaskDetails"));
    this.commonUtils.mapAttributes(taskInfo,[["class", "taskDetails showTaskDetails"]]);
    console.log(index+"????")
    let task = tasks.find(({id}) => id == index);
    this.taskName = task.name;
    console.log(this.taskName+"VVVVVVVVV");
    //totalTasks = tasks[index].subtasks.length;
    //completedTasks = getCompletedTasks(index);
    //this.commonUtils.addInnerHTML(para,`${completedTasks} of ${totalTasks} tasks completed`);
    //$(para).html(`${completedTasks} of ${totalTasks} tasks completed`);
  }

  public displaySubTasks(id) {

  }

}
