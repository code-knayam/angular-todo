import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.fetchTaskList();
    this.tasksService.fetchTasks();
  }

}
