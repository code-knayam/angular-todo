import { User } from './user.model';
import { UtilityService } from './utility.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private user: User;

  constructor(private utilityService: UtilityService) { }

  // Setting user info
  setUser(user: User) {
    this.user = user;
    console.log('[UserService] Setting User info ->', this.user);
    return this.utilityService.createUser(this.user.email, this.user.userName);
  }

  // returning user info object
  getUser() {
    return this.user;
  }

  // initializing app to fetch user details
  initApp() {
    return this.utilityService.getUserDetails(this.user.email);
  }
}
