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

  // SignInUser with Google
  signInUserWithGoogle() {
    console.log('[AuthService] Signing In with Google');
    this.spinnerService.showSpinner();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(
        () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          return firebase.auth().signInWithPopup(provider);
        }
      ).then(
        (result) => {
          console.log('[AuthService] Post Sign In API Response ->', result);
          let credential: any;
          credential = result.credential;

          // Setting Id Token
          this.idToken = credential.idToken;
          // Creating new user and storing it
          const newUser = new User(result.user.displayName, result.user.email, result.user.photoURL);
          this.userService.setUser(newUser)
            .subscribe(
            (response: any) => {
                // Saving id token and user info in local sotrage
                this.saveUserDataAndTokenInLocalStorage(this.idToken, newUser);
                console.log('[AuthService] Post Setting User ->', response);
                this.router.navigate(['/']);
              }
            );
        }
      ).catch(function (error) {
        // Handle Errors here.
        console.log('[AuthService] Error while Google Sign In ->', error);
        // ...
      });
  }

  // checking if user is logged in
  isUserLoggedIn() {
    return this.idToken != null;
  }

  // Saving id and user detail in local storage
  saveUserDataAndTokenInLocalStorage(idToken, newUser) {
    this.resetLocalStorage();
    localStorage.setItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY, idToken);
    localStorage.setItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY, JSON.stringify(newUser));
  }

  // checking if id token stored in local storage
  ifIdTokenPresentInLocalStorage() {
    return localStorage.getItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY) !== null;
  }

  // auto signin using it token in local storage
  autoSignInWithIdTokenFromLocalStorage() {
    console.log('[AuthService] Signing In with Local Storage Id');
    this.spinnerService.showSpinner();
    const idToken = localStorage.getItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY);
    const user = JSON.parse(localStorage.getItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY));

    this.idToken = idToken;
    // Setting user
    this.userService.setUser(user)
      .subscribe(
        (response: any) => {
          console.log('[AuthService] Post Setting User ->', response);
          this.router.navigate(['/']);
        }
      );
  }

  // Signing out user - resetting local storage and removing id Token
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

  // Resetting local storage
  resetLocalStorage() {
    localStorage.removeItem(CONSTANTS.USER_ID_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(CONSTANTS.USER_DETAILS_LOCAL_STORAGE_KEY);
  }
}
