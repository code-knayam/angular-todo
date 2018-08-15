import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { UtilityService } from './utility.service';
import { UserService } from './user.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class TaskService {

  taskSubject = new Subject<Task[]>();
  completedTaskSubject = new Subject<Task[]>();
  activeListNameSubject = new Subject<string>();
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  private userDetailsAPIResponse;
  activeList;


  constructor(private utilityService: UtilityService,
    private userService: UserService,
    private spinnerService: SpinnerService) { }

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
    this.activeListNameSubject.next(this.activeList.list_name);
  }

  // setting user details api response
  setUserDetailsAPIResponse(response) {
    this.userDetailsAPIResponse = response;
    console.log(this.userDetailsAPIResponse);
    this.activeList = this.userDetailsAPIResponse.lists_arr[0];
  }

  // saving a new task
  saveNewTask(taskName: string) {
    this.spinnerService.showSpinner();
    this.utilityService.addTask(this.userService.getUser().email, this.activeList.list_id, taskName)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('Adding new task', response);
            const newTask = new Task(response.task_id, taskName, false);
            this.tasks.unshift(newTask);
            this.taskSubject.next(this.tasks);
          } else {
            console.log('Error while adding new task', response);
          }
          this.spinnerService.hideSpinner();
        }
      );
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
    this.spinnerService.showSpinner();
    this.updateTaskStatus(taskId, true)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('Updating status', response);
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
            console.log('Toggled task with id to true status', taskId);
            console.log('Tasks', this.tasks);
            console.log('Task completed', this.completedTasks);
            this.spinnerService.hideSpinner();
            return true;
          } else {
            this.spinnerService.hideSpinner();
            console.log('Error while Updating', response);
            return false;
          }
        }
    );
    // fallback return to false to depict pending task
    return false;
  }

  // toggling task to pending
  toggleTaskToPending(taskId: string) {
    this.spinnerService.showSpinner();
    this.updateTaskStatus(taskId, false)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
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
            console.log('Toggled task with id to false status', taskId);
            console.log('Tasks', this.tasks);
            console.log('Task completed', this.completedTasks);
            this.spinnerService.hideSpinner();
            return false;
          } else {
            this.spinnerService.hideSpinner();
            console.log('Error while Updating', response);
            return true;
          }
        }
    );
    // fallback return to true to depict completed task
    return true;
  }

  updateTaskStatus(taskId: string, status: boolean) {
    return this.utilityService.updateTaskStatus(this.userService.getUser().email, this.activeList.list_id, taskId, status);
  }

}
