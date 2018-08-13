import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { UtilityService } from './utility.service';

@Injectable()
export class TaskService {

  taskSubject = new Subject<Task[]>();
  completedTaskSubject = new Subject<Task[]>();
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  private userDetailsAPIResponse;
  activeListId;


  constructor(private utilityService: UtilityService) { }

  fetchTasksFromList(userId: string, listId: string) {
    return this.utilityService.getTasksFromList(userId, listId);
  }

  setTasks(taskResponse) {
    for (let index = 0; index < taskResponse.length; index++) {
      const task = new Task(taskResponse[index].task_id, taskResponse[index].task_name, taskResponse[index].completed_status);
      if (task.completed) {
        this.completedTasks.push(task);
      } else {
        this.tasks.push(task);
      }
    }
    console.log(this.tasks);
    console.log(this.completedTasks);
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
  }

  setUserDetailsAPIResponse(response) {
    this.userDetailsAPIResponse = response;
    console.log(this.userDetailsAPIResponse);
    this.activeListId = this.userDetailsAPIResponse.lists_arr[0].list_id;
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
