import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { UtilityService } from './utility.service';

@Injectable()
export class TaskService {

  taskSubject = new Subject<Task[]>();
  private tasks: Task[] = [];

  private completedTasks: Task[] = [
    new Task('default completed task', true, new Date())
  ];

  constructor(private utilityService: UtilityService) { }

  fetchTasks() {
    this.utilityService.fetchUserTasks('qrqc1EHOPCp21wvN9ngp', 'BWhA55MONLnyugRVUDqd').subscribe(
      (response: any) => {
        response.forEach(taskObject => {
          console.log(taskObject);
          const newTask = new Task(taskObject.task_name, taskObject.task_completed, taskObject.date_created);
          this.tasks.push(newTask);
        });
        this.taskSubject.next(this.tasks);
      }
    );
  }

  saveNewTask(newTask: Task) {
    console.log(newTask);
    this.tasks.unshift(newTask);
    this.taskSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasks.slice();
  }

  getCompletedTasks() {
    return this.completedTasks.slice();
  }

}
