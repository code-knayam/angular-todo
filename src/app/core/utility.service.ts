import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilityService {

  private CREATE_USER_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/createUserAPI';
  private USER_DETAILS_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/userDetailsAPI';
  private GET_TASK_FROM_LIST_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/getTasksFromListAPI';
  private ADD_TASK_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/addTaskAPI';
  private UPDATE_TASK_STATUS_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/updateTaskStatusAPI';
  private ADD_LIST_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/addListAPI';
  private RENAME_TASK_LIST_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/renameListAPI';
  private DELETE_TASK_LIST_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/deleteListAPI';
  private DELETE_TASK_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/deleteTaskAPI';
  private UPDATE_TASK_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/updateTaskAPI';

  constructor(private http: HttpClient) {}

  createUser(userId: string, username: string) {
    return this.http.get(this.CREATE_USER_API
      + '?userid=' + userId
      + '&username=' + username);
  }

  getUserDetails(userId: string) {
    return this.http.get(this.USER_DETAILS_API
      + '?userid=' + userId);
  }

  getTasksFromList(userId: string, listId: string) {
    return this.http.get(this.GET_TASK_FROM_LIST_API
      + '?userid=' + userId
      + '&listid=' + listId);
  }

  addTask(userId: string, listId: string, taskName: string) {
    return this.http.get(this.ADD_TASK_API
      + '?userid=' + userId
      + '&listid=' + listId
      + '&taskname=' + taskName);
  }

  updateTaskStatus(userId: string, listId: string, taskId: string, taskStatus: boolean) {
    return this.http.get(this.UPDATE_TASK_STATUS_API
      + '?userid=' + userId
      + '&listid=' + listId
      + '&taskid=' + taskId
      + '&status=' + taskStatus);
  }

  addNewList(userId: string, listName: string) {
    return this.http.get(this.ADD_LIST_API
      + '?userid=' + userId
      + '&listname=' + listName);
  }

  renameTaskList(userId: string, listId: string, listName: string) {
    return this.http.get(this.RENAME_TASK_LIST_API
      + '?userid=' + userId
      + '&listid=' + listId
      + '&listname=' + listName);
  }

  deleteTaskList(userId: string, listId: string) {
    return this.http.get(this.DELETE_TASK_LIST_API
      + '?userid=' + userId
      + '&listid=' + listId);
  }

  deleteTask(userId: string, listId: string, taskId: string) {
    return this.http.get(this.DELETE_TASK_API
      + '?userid=' + userId
      + '&listid=' + listId
      + '&taskid=' + taskId);
  }

  updateTask(userId: string, listId: string, taskId: string, taskName: string) {
    return this.http.get(this.UPDATE_TASK_API
      + '?userid=' + userId
      + '&listid=' + listId
      + '&taskid=' + taskId
      + '&taskname=' + taskName);
  }

}
