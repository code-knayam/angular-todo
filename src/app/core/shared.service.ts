import { Subject } from 'rxjs';

export class SharedService {

  addTaskFormFlag = new Subject<boolean>();
  toggleTaskMenuFlag = new Subject<boolean>();
  toggleMenuFlag = new Subject<boolean>();

  toggleAddTaskForm(flag: boolean) {
    this.addTaskFormFlag.next(flag);
  }

  toggleTaskMenu(flag: boolean) {
    this.toggleTaskMenuFlag.next(flag);
  }

  toggleMenu(flag: boolean) {
    this.toggleMenuFlag.next(flag);
  }

}
