import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from './auth.service';

declare var googleyolo: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private clientId = '258304393244-adqi0as8743c4f8dtvnls86h3nom39e4.apps.googleusercontent.com';

  constructor(private authService: AuthService) {

  }

  ngOnInit() { }

  getStartedWithGoogle() {
    this.authService.signInUser();
  }

  getStartedWithEmail() {
  }

}
