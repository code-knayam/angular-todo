import { Subject } from 'rxjs';

export class SharedService {

  addTaskFormSubject = new Subject<boolean>();
  taskMenuSubject = new Subject<boolean>();
  menuSubject = new Subject<boolean>();

  // toggle add task form container
  toggleAddTaskForm(flag: boolean) {
    this.addTaskFormSubject.next(flag);
  }

  // toggle task menu container
  toggleTaskMenu(flag: boolean) {
    this.taskMenuSubject.next(flag);
  }

  // toggle common menu container
  toggleMenu(flag: boolean) {
    this.menuSubject.next(flag);
  }

}
