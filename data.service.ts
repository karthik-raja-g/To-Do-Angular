import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Task} from 'src/app/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentTask = new BehaviorSubject(new Task());
  activeTask = this.currentTask.asObservable();

  constructor() { }

  updateTask(task: Task){
    this.currentTask.next(task);
  }
}
