import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../core/user.model';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private userService: UserService, private router: Router) {

  }

  signInUser() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
      (result) => {
        console.log(result);

        this.token = result.credential.idToken;
        const newUser = new User(result.user.displayName, result.user.email, result.user.photoURL);
        this.userService.setUser(newUser);
        this.router.navigate(['/']);
      }
    ).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  isUserLoggedIn() {
    return this.token != null;
  }
}
