import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private clientId = '258304393244-adqi0as8743c4f8dtvnls86h3nom39e4.apps.googleusercontent.com';

  constructor(private authService: AuthService, private spinnerService: SpinnerService) {

  }

  ngOnInit() { }

  getStartedWithGoogle() {
    this.spinnerService.showSpinner();
    this.authService.signInUser();
  }

  getStartedWithEmail() {
  }

}
