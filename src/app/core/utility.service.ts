import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilityService {

  private GET_USER_INFO_URL = 'https://us-central1-angulartodo-af85b.cloudfunctions.net/getUserInfo';

  constructor(private http: HttpClient) {

  }

  fetchUserInfo(userId: string) {
    this.http.get(this.GET_USER_INFO_URL + '?userid=' + userId).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
