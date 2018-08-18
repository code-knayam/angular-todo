import { Subject } from 'rxjs';

export class SharedService {

  taskMenuSubject = new Subject<boolean>();
  menuSubject = new Subject<boolean>();

  // toggle task menu container
  toggleTaskMenu(flag: boolean) {
    this.taskMenuSubject.next(flag);
  }

  // toggle common menu container
  toggleMenu(flag: boolean) {
    this.menuSubject.next(flag);
  }

}
