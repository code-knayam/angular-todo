import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { TaskService } from '../../task.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent implements OnInit {

  menuFlag: boolean;
  user: User;
  lists = [];
  activeListId = '';

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private taskService: TaskService,
  private authService: AuthService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.taskService.listsSubject.subscribe(
      (lists: any) => {
        this.lists = lists;
      }
    );
    this.taskService.activeListSubject.subscribe(
      (list: any) => {
        this.activeListId = list.list_id;
      }
    );
    this.sharedService.menuSubject.subscribe(
      (flag: boolean) => {
        this.menuFlag = flag;
      }
    );
  }

  onCloseMenuBtn() {
    this.sharedService.toggleMenu(false);
  }

  onSignOutBtn() {
    this.authService.signOutUser();
    this.onCloseMenuBtn();
  }

  onMakeListActiveBtn(listId: string) {
    // Making list active if its not active one
    if (listId !== this.activeListId) {
      this.taskService.makeListActive(listId);
      this.onCloseMenuBtn();
    }
  }

  onCreateNewListBtn() {
    this.sharedService.toggleCreateNewListForm(true);
    this.onCloseMenuBtn();
  }

}
