import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../core/user.model';
import { UserService } from '../core/user.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class AuthService {

  idToken: string;

  constructor(private userService: UserService, private router: Router, private spinnerService: SpinnerService) {

  }

  signInUserWithGoogle() {
    console.log('Sign In with Google');
    this.spinnerService.showSpinner();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(
        () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          return firebase.auth().signInWithPopup(provider);
        }
      ).then(
        (result) => {
          console.log(result);
          let credential: any;
          credential = result.credential;

          this.idToken = credential.idToken;
          const newUser = new User(result.user.displayName, result.user.email, result.user.photoURL);
          this.userService.setUser(newUser)
          .subscribe(
            (response: any) => {
                this.saveUserDataAndTokenInLocalStorage(this.idToken, newUser);
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
    return this.idToken != null;
  }

  saveUserDataAndTokenInLocalStorage(idToken, newUser) {
    localStorage.setItem('user_id_token', idToken);
    localStorage.setItem('user_details', JSON.stringify(newUser));
  }

  ifIdTokenPresentInLocalStorage() {
    return localStorage.getItem('user_id_token') !== null;
  }

  autoSignInWithIdTokenFromLocalStorage() {
    console.log('Sign In with Local Storage Id');
    this.spinnerService.showSpinner();
    const idToken = localStorage.getItem('user_id_token');
    const user = JSON.parse(localStorage.getItem('user_details'));

    this.idToken = idToken;
    this.userService.setUser(user)
    .subscribe(
      (response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        }
      );
  }
}
