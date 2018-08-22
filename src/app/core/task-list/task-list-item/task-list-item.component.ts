import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  @Input('task') task: Task;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  onToggleTaskToCompleted() {
    this.task.completed = this.taskService.toggleTaskToCompleted(this.task.id);
  }

  onToggleTaskToPending() {
    this.task.completed = this.taskService.toggleTaskToPending(this.task.id);
  }

  onGoToEditTask() {
    this.taskService.setTaskToBeEdited(this.task);
    this.router.navigate(['/editTask']);
  }

}
