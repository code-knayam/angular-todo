import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  @Input('task') task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onToggleTaskToCompleted() {
    this.task.completed = true;
    this.taskService.toggleTaskToCompleted(this.task.id);
  }

  onToggleTaskToPending() {
    this.task.completed = false;
    this.taskService.toggleTaskToPending(this.task.id);
  }

}
