import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    // this.utilityService.fetchUserInfo('qrqc1EHOPCp21wvN9ngp');
    // this.utilityService.fetchUserLists('qrqc1EHOPCp21wvN9ngp');
    // this.utilityService.fetchUserTasks('qrqc1EHOPCp21wvN9ngp', 'BWhA55MONLnyugRVUDqd');
    this.taskService.fetchTasks();
  }

}
