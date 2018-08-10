import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './task.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    // this.utilityService.fetchUserInfo('qrqc1EHOPCp21wvN9ngp');
    // this.utilityService.fetchUserLists('qrqc1EHOPCp21wvN9ngp');
    // this.utilityService.fetchUserTasks('qrqc1EHOPCp21wvN9ngp', 'BWhA55MONLnyugRVUDqd');
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/auth']);
    } else {
      this.taskService.fetchTasks();
    }
  }

}
