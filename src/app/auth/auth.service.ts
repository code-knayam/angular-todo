import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../core/user.model';
import { UserService } from '../core/user.service';
import { SpinnerService } from '../spinner/spinner.service';
import * as CONSTANTS from '../constants';

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
    localStorage.setItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY, idToken);
    localStorage.setItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY, JSON.stringify(newUser));
  }

  ifIdTokenPresentInLocalStorage() {
    return localStorage.getItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY) !== null;
  }

  autoSignInWithIdTokenFromLocalStorage() {
    console.log('Sign In with Local Storage Id');
    this.spinnerService.showSpinner();
    const idToken = localStorage.getItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY);
    const user = JSON.parse(localStorage.getItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY));

    this.idToken = idToken;
    this.userService.setUser(user)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        }
      );
  }

  signOutUser() {
    firebase.auth().signOut()
      .then(
        () => {
          this.idToken = null;
          this.resetLocalStorage();
          this.router.navigate(['/auth']);
        }
      );
  }

  resetLocalStorage() {
    localStorage.removeItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY);
  }
}
