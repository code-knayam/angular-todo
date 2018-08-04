import { Subject } from 'rxjs';
import { Task } from './task.model';

export class TaskService {

  addTaskFormFlag = new Subject<boolean>();

  showAddTaskForm() {
    this.addTaskFormFlag.next(true);
  }

  saveNewTask(newTask: Task) {
    console.log(newTask);
  }
}
