import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './task.service';
import { AuthService } from '../auth/auth.service';
import { SpinnerService } from '../spinner/spinner.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private taskService: TaskService,
    private spinnerService: SpinnerService,
  private userService: UserService) { }

  ngOnInit() {
    this.spinnerService.showSpinner();

    // check if user logged in otherwise redirect to auth page
    if (!this.authService.isUserLoggedIn()) {
      this.spinnerService.hideSpinner();
      this.router.navigate(['/auth']);
    } else {
      // if user logged in, setting up proper responses
      const user = this.userService.getUser();
      this.userService.initApp().subscribe(
        (response) => {
          // setting user details response
          this.taskService.setUserDetailsAPIResponse(response);
          // fetching task for list and setting them
          this.taskService.fetchTasksFromList(user.email, this.taskService.activeList.list_id)
          .subscribe(
            (taskResponse: any) => {
              this.spinnerService.hideSpinner();
              this.taskService.setTasks(taskResponse.tasks_arr);
              }
            );
        }
      );
    }
  }

}
