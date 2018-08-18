import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-menu-container',
  templateUrl: './task-menu-container.component.html',
  styleUrls: ['./task-menu-container.component.css']
})
export class TaskMenuContainerComponent implements OnInit {

  taskMenuFlag: boolean;

  constructor(private sharedService: SharedService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.sharedService.taskMenuSubject.subscribe(
      (flag: boolean) => {
        this.taskMenuFlag = flag;
      }
    );
  }

  onCloseTaskMenu() {
    this.sharedService.toggleTaskMenu(false);
  }

  onDeleteList() {
    this.taskService.deleteTaskList();
    this.onCloseTaskMenu();
  }

  onRenameList() {
    this.onCloseTaskMenu();
    this.router.navigate(['/renameList']);
  }

}
