import { Subject } from 'rxjs';

export class SharedService {

  addTaskFormFlag = new Subject<boolean>();

  showAddTaskForm() {
    this.addTaskFormFlag.next(true);
  }

}
