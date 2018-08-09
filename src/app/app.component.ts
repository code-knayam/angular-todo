import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCn6nb7b9CnOSHodxEAyceYWaDHLmSNkM4',
      authDomain: 'angulartodo-af85b.firebaseapp.com',
      projectId: 'angulartodo-af85b'
    });
  }
}
