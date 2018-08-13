import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../core/user.model';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthService {

  private credential: any = {};

  constructor(private userService: UserService, private router: Router) {

  }

  signInUser() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
      (result) => {
        console.log(result);

        this.credential = result.credential;
        const newUser = new User(result.user.displayName, result.user.email, result.user.photoURL);
        this.userService.setUser(newUser)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.router.navigate(['/']);
            }
          );
      }
    ).catch(function (error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });
  }

  isUserLoggedIn() {
    return this.credential.accessToken != null;
  }
}
