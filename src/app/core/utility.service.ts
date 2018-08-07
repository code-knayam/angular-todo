import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilityService {

  private GET_USER_INFO_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/getUserInfo';
  private GET_USER_LISTS_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/getUserLists';
  private GET_USER_TASKS_API = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/getUserTasks';

  constructor(private http: HttpClient) {

  }

  fetchUserInfo(userId: string) {
    this.http.get(this.GET_USER_INFO_API + '?userid=' + userId).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  fetchUserLists(userId: string) {
    this.http.get(this.GET_USER_LISTS_API + '?userid=' + userId).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  fetchUserTasks(userId: string, listId: string) {
    return this.http.get(this.GET_USER_TASKS_API + '?userid=' + userId + '&listid=' + listId);
  }

}
