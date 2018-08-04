import { Subject } from 'rxjs';

export class TaskService {

  addTaskFormFlag = new Subject<boolean>();

  showAddTaskForm() {
    this.addTaskFormFlag.next(true);
  }
}
