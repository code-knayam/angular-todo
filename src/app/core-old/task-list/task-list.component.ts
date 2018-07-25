import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskList } from '../taskList.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskLists: TaskList[];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.taskLists = this.tasksService.getTaskLists();
  }

}
