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

  toggleTaskToCompleted(taskId: string) {
    // finding the task obejct based on taskID
    const task = this.tasks.find(taskObj => {
      return taskObj.id === taskId;
    });
    task.completed = true;

    // removing it from tasks list
    this.tasks = this.tasks.filter(taskObj => {
      return taskObj.id !== taskId;
    });

    // adding task found to completed list
    this.completedTasks.push(task);

    // invoking subject with new values
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
    console.log('Toggled task with id', taskId);
    console.log('Tasks', this.tasks);
    console.log('Task completed', this.completedTasks);
  }

  toggleTaskToPending(taskId: string) {
    // finding the task obejct based on taskID
    const task = this.completedTasks.find(taskObj => {
      return taskObj.id === taskId;
    });
    task.completed = false;

    // removing it from completed tasks list
    this.completedTasks = this.completedTasks.filter(taskObj => {
      return taskObj.id !== taskId;
    });

    // adding task found to task list
    this.tasks.push(task);

    // invoking subject with new values
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
    console.log('Toggled task with id', taskId);
    console.log('Tasks', this.tasks);
    console.log('Task completed', this.completedTasks);
  }

}
