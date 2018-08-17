import { Subject } from 'rxjs';

export class SharedService {

  addTaskFormSubject = new Subject<boolean>();
  taskMenuSubject = new Subject<boolean>();
  menuSubject = new Subject<boolean>();
  createNewListFormSubject = new Subject<boolean>();

  toggleAddTaskForm(flag: boolean) {
    this.addTaskFormSubject.next(flag);
  }

  toggleTaskMenu(flag: boolean) {
    this.taskMenuSubject.next(flag);
  }

  toggleMenu(flag: boolean) {
    this.menuSubject.next(flag);
  }

  toggleCreateNewListForm(flag: boolean) {
    this.createNewListFormSubject.next(flag);
  }

}
