import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onAddTaskBtn() {
    this.sharedService.toggleAddTaskForm(true);
  }

  onMenuToggleBtn() {
    this.sharedService.toggleMenu(true);
  }

  onTaskMenuToggleBtn() {
    this.sharedService.toggleTaskMenu(true);
  }

}
