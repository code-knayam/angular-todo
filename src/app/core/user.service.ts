import { User } from './user.model';
import { UtilityService } from './utility.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private user: User;

  constructor(private utilityService: UtilityService) { }

  setUser(user: User) {
    this.user = user;
    console.log(this.user);
    return this.utilityService.createUser(this.user.email, this.user.userName);
  }

  getUser() {
    return this.user;
  }

  initApp() {
    return this.utilityService.getUserDetails(this.user.email);
  }
}
