import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  completedTasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.completedTasks = this.taskService.getCompletedTasks();
    this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

}
