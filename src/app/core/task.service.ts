import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { UtilityService } from './utility.service';
import { UserService } from './user.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class TaskService {

  taskSubject = new Subject<Task[]>();
  listsSubject = new Subject<any[]>();
  completedTaskSubject = new Subject<Task[]>();
  activeListSubject = new Subject<{}>();
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  private userDetailsAPIResponse;
  activeList;


  constructor(private utilityService: UtilityService,
    private userService: UserService,
    private spinnerService: SpinnerService) { }

  // Call utility method to fetch lists from backend
  fetchTasksFromList(userId: string, listId: string) {
    console.log('[TaskService] fetching tasks from list ->', listId);
    return this.utilityService.getTasksFromList(userId, listId);
  }

  // setting tasks according to current list active
  setTasks(taskResponse) {
    console.log('[TaskService] Setting tasks response ->', taskResponse);
    this.tasks = [];
    this.completedTasks = [];
    for (let index = 0; index < taskResponse.length; index++) {
      const task = new Task(taskResponse[index].task_id, taskResponse[index].task_name, taskResponse[index].completed_status);
      // seggregating task as completed and pending
      if (task.completed) {
        this.completedTasks.push(task);
      } else {
        this.tasks.push(task);
      }
    }
    console.log('[TaskService] Tasks Array ->', this.tasks);
    console.log('[TaskService] Completed Tasks Array ->', this.completedTasks);
    this.taskSubject.next(this.tasks);
    this.completedTaskSubject.next(this.completedTasks);
    this.activeListSubject.next(this.activeList);
  }

  // setting user details api response
  setUserDetailsAPIResponse(response) {
    console.log('[TaskService] Setting User Detail API Response ->', response);
    this.userDetailsAPIResponse = response;
    // Setting first list as active one
    this.activeList = this.userDetailsAPIResponse.lists_arr[0];
    this.listsSubject.next(this.userDetailsAPIResponse.lists_arr);
  }

  // saving a new task by calling utility method
  saveNewTask(taskName: string) {
    this.spinnerService.showSpinner();
    console.log('[TaskService] Saving new task ->', taskName);
    this.utilityService.addTask(this.userService.getUser().email, this.activeList.list_id, taskName)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('[TaskService] Adding new task ->', response);
            const newTask = new Task(response.task_id, taskName, false);
            this.tasks.unshift(newTask);
            this.taskSubject.next(this.tasks);
          } else {
            console.log('[TaskService] Error while adding new task ->', response);
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
    console.log('[TaskService] Updating task id status to complete ->', taskId);
    this.updateTaskStatus(taskId, true)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('[TaskService] Updating status to completed ->', response);
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
            console.log('[TaskService] Toggled task with id to true status ->', taskId);
            console.log('[TaskService] New Tasks Array ->', this.tasks);
            console.log('[TaskService] New Completed Tasks Array ->', this.completedTasks);
            this.spinnerService.hideSpinner();
            return true;
          } else {
            this.spinnerService.hideSpinner();
            console.log('[TaskService] Error while Updating ->', response);
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
    console.log('[TaskService] Updating task id status to pending ->', taskId);
    this.updateTaskStatus(taskId, false)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('[TaskService] Updating status to pending ->', response);
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
            console.log('[TaskService] Toggled task with id to false status ->', taskId);
            console.log('[TaskService] New Tasks Array ->', this.tasks);
            console.log('[TaskService] New Completed Tasks Array ->', this.completedTasks);
            this.spinnerService.hideSpinner();
            return false;
          } else {
            this.spinnerService.hideSpinner();
            console.log('[TaskService] Error while Updating ->', response);
            return true;
          }
        }
      );
    // fallback return to true to depict completed task
    return true;
  }

  // calling utility method to update status
  updateTaskStatus(taskId: string, status: boolean) {
    return this.utilityService.updateTaskStatus(this.userService.getUser().email, this.activeList.list_id, taskId, status);
  }

  // make a list active
  makeListActive(listId: string) {
    this.spinnerService.showSpinner();
    console.log('[TaskService] Make list active ->', listId);
    // finding list details based on list id
    const newActiveList = this.userDetailsAPIResponse.lists_arr.find(listObj => {
      return listObj.list_id === listId;
    });
    console.log('[TaskService] New active list obj ->', newActiveList);
    // Fetching tasks for active list and setting them
    this.fetchTasksFromList(this.userService.getUser().email, listId)
      .subscribe(
        (taskResponse: any) => {
          this.activeList = newActiveList;
          this.setTasks(taskResponse.tasks_arr);
          this.spinnerService.hideSpinner();
          console.log('[TaskService] Tasks Response for new active lsit ->', taskResponse);
        }
      );
  }

  // Creating new list
  createNewList(listName: string) {
    this.spinnerService.showSpinner();
    console.log('[TaskService] Creating new list ->', listName);
    // calling utility method to add new list
    this.utilityService.addNewList(this.userService.getUser().email, listName)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('[TaskService] Create New list API response ->', response);
            const newListId = response.list_id;
            // adding new list to lists array
            this.userDetailsAPIResponse.lists_arr.push({
              list_id: newListId,
              list_name: listName
            });
            console.log('[TaskService] Post adding list User Details Response ->', this.userDetailsAPIResponse);
            // making newly list made as active
            this.makeListActive(newListId);
            this.listsSubject.next(this.userDetailsAPIResponse.lists_arr);
            this.spinnerService.hideSpinner();
          }
        }
      );
  }

  // Delete task list
  deleteTaskList() {
    this.spinnerService.showSpinner();
    console.log('[TaskService] Deleting current active list ->', this.activeList);
    this.utilityService.deleteTaskList(this.userService.getUser().email, this.activeList.list_id)
    .subscribe(
      (response: any) => {
        console.log('[TaskService] DeleteTaskList ->', response);
        if (response.status === 200) {
          this.userDetailsAPIResponse.lists_arr = this.userDetailsAPIResponse.lists_arr.filter(listObj => {
            return listObj.list_id !== this.activeList.list_id;
          });
          this.makeListActive(this.userDetailsAPIResponse.lists_arr[0].list_id);
          this.listsSubject.next(this.userDetailsAPIResponse.lists_arr);
        }
        this.spinnerService.hideSpinner();
      }
    );
  }
}
