import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private sharedService: SharedService,
  private router: Router) { }

  ngOnInit() {
  }

  onAddTaskBtn() {
    // this.sharedService.toggleAddTaskForm(true);
    this.router.navigate(['addTask']);
  }

  onMenuToggleBtn() {
    this.sharedService.toggleMenu(true);
  }

  onTaskMenuToggleBtn() {
    this.sharedService.toggleTaskMenu(true);
  }

}
