import { Subject } from 'rxjs';
import { Task } from './task.model';

export class TaskService {

  addTaskFormFlag = new Subject<boolean>();
  taskSubject = new Subject<Task[]>();
  tasks: Task[] = [];

  showAddTaskForm() {
    this.addTaskFormFlag.next(true);
  }

  saveNewTask(newTask: Task) {
    console.log(newTask);
    this.tasks.push(newTask);
    this.taskSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}
