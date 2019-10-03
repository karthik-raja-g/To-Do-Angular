import { Component, OnInit, Input } from '@angular/core';
//import {  } from '../tasks/tasks.component';
import {Task} from 'src/app/Task';
import {CategoryService} from "src/app/category-service.service";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  isToggled:boolean= false;

  taskName : string;
  tasks : Task[] = [];
  ca = new CategoryService;
  task: Task;
  
  constructor() { }

  public addTask(e) {
    console.log(e.target.value);
    console.log(e.keyCode);
    if(e.keyCode == 13 && e.target.value != "") {
      console.log(this.taskName + "$$$$$");
      this.tasks.push(this.ca.addTask(e.target.value));
      console.log(this.ca.addTask(e.target.value));
      console.log(this.tasks);
    }

  }

  public toggle(e) {
    this.isToggled = !this.isToggled;
  }

  ngOnInit() {
  }

}
