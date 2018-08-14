import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCn6nb7b9CnOSHodxEAyceYWaDHLmSNkM4',
      authDomain: 'angulartodo-af85b.firebaseapp.com',
      projectId: 'angulartodo-af85b'
    });

    if (this.authService.ifIdTokenPresentInLocalStorage()) {
      this.authService.autoSignInWithIdTokenFromLocalStorage();
    }
  }
}
