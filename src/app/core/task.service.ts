import { Subject } from 'rxjs';
import { Task } from './task.model';

export class TaskService {

  taskSubject = new Subject<Task[]>();
  private tasks: Task[] = [
    new Task('default task', false)
  ];

  private completedTasks: Task[] = [
    new Task('default completed task', true)
  ];

  saveNewTask(newTask: Task) {
    console.log(newTask);
    this.tasks.unshift(newTask);
    this.taskSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasks.slice();
  }

  getCompletedTasks() {
    return this.completedTasks.slice();
  }

}
