import { Subject } from 'rxjs';
import { Task } from './task.model';

export class TaskService {

  taskSubject = new Subject<Task[]>();
  tasks: Task[] = [];

  saveNewTask(newTask: Task) {
    console.log(newTask);
    this.tasks.unshift(newTask);
    this.taskSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}
