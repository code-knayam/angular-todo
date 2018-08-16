import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  completedTasks: Task[] = [];
  listName = '';
  showCompletedTaskFlag = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.completedTaskSubject.subscribe(
      (tasks: Task[]) => {
        this.completedTasks = tasks;
      }
    );
    this.taskService.activeListSubject.subscribe(
      (list: any) => {
        this.listName = list.list_name;
      }
    );
  }

  onToggleCompletedTask() {
    this.showCompletedTaskFlag = !this.showCompletedTaskFlag;
  }

}
