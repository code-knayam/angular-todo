import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { UtilityService } from './utility.service';

@Injectable()
export class TaskService {

  taskSubject = new Subject<Task[]>();
  completedTaskSubject = new Subject<Task[]>();
  activeListNameSubject = new Subject<string>();
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  private userDetailsAPIResponse;
  activeListId;


  constructor(private utilityService: UtilityService) { }

  // Call utility method to fetch lists from backend
  fetchTasksFromList(userId: string, listId: string) {
    return this.utilityService.getTasksFromList(userId, listId);
  }

  // setting tasks according to current list active
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
    this.activeListNameSubject.next(this.getActiveListName());
  }

  // setting user details api response
  setUserDetailsAPIResponse(response) {
    this.userDetailsAPIResponse = response;
    console.log(this.userDetailsAPIResponse);
    this.activeListId = this.userDetailsAPIResponse.lists_arr[0].list_id;
  }

  // saving a new task
  saveNewTask(newTask: Task) {
    console.log(newTask);
    this.tasks.unshift(newTask);
    this.taskSubject.next(this.tasks);
  }

  // returning tasks list
  getTasks() {
    return this.tasks.slice();
  }

  // returning completed task list
  getCompletedTasks() {
    return this.completedTasks.slice();
  }

  // toggling task to completed
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
    this.completedTasks.unshift(task);

    // invoking subject with new values
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
    console.log('Toggled task with id', taskId);
    console.log('Tasks', this.tasks);
    console.log('Task completed', this.completedTasks);
  }

  // toggling task to pending
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
    this.tasks.unshift(task);

    // invoking subject with new values
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
    console.log('Toggled task with id', taskId);
    console.log('Tasks', this.tasks);
    console.log('Task completed', this.completedTasks);
  }


  getActiveListName() {
    const activeList = this.userDetailsAPIResponse.lists_arr.find(listObj => {
      return listObj.list_id === this.activeListId;
    });
    return activeList.list_name;
  }

}
