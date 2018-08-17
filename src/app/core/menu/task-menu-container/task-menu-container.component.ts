import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-task-menu-container',
  templateUrl: './task-menu-container.component.html',
  styleUrls: ['./task-menu-container.component.css']
})
export class TaskMenuContainerComponent implements OnInit {

  taskMenuFlag: boolean;

  constructor(private sharedService: SharedService) { }

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

}
