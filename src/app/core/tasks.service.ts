import { Task } from './task.model';
import { TaskList } from './taskList.model';

export class TasksService {

  private taskLists: TaskList[];
  private tasks: Task[];

  fetchTaskList() {
    // Fetch task lists from server
    this.taskLists = [
      new TaskList('List 1', 'L1'),
      new TaskList('List 2', 'L2'),
      new TaskList('List 3', 'L3'),
      new TaskList('List 4', 'L4')
    ];
  }

  fetchTasks() {
    // Fetch tasks from server
    this.tasks = [
      new Task('T1', 'Task 1', 'L1'),
      new Task('T2', 'Task 2', 'L2'),
      new Task('T3', 'Task 3', 'L2'),
      new Task('T4', 'Task 4', 'L3')
    ];
  }

  getTaskLists() {
    return this.taskLists;
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    console.log(this.tasks);
  }

  getTasks() {
    return this.tasks.slice();
  }

  getTaskId() {
    if (this.tasks.length === 0) {
      return 'T1';
    } else {
      const lastTaskId = this.tasks[this.tasks.length - 1].taskID.slice(1);
      return 'T' + (parseInt(lastTaskId, 10) + 1);
    }
  }
}
