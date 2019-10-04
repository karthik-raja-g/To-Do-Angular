import { Injectable } from '@angular/core';
import {SubTask} from "src/app/SubTask";
import {Task} from "src/app/Task";
//import {Tasks} from 'src/app/tasks';


//export const HEROES: Hero[] = [

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  //tasks = Tasks
  constructor() { }

  public addTask(task) {
     let newTask = new Task();
    newTask.id = Date.now();
    newTask.name = task;
    newTask.isAvailable = true;
    newTask.isDeleted = false; 
    //this.tasks.push(newTask);
    return newTask;
  }

}
