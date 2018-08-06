import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  @Input('task') task: Task;

  constructor() { }

  ngOnInit() {
  }

  onToggleTaskCompleted() {
    this.task.completed = !this.task.completed;
  }

}
