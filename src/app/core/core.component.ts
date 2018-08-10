import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './task.service';
import { AuthService } from '../auth/auth.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private taskService: TaskService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.hideSpinner();
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/auth']);
    } else {
      this.taskService.fetchTasks();
    }
  }

}
