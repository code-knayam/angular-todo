import { User } from './user.model';

export class UserService {
  user: User;

  setUser(user: User) {
    this.user = user;
    console.log(this.user);
  }
}
