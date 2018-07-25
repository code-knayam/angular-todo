import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskCompletedFlag = false;
  addTaskForm: FormGroup;
  taskLists;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.taskLists = this.tasksService.getTaskLists();
    this.initForm();
  }

  initForm() {
    this.addTaskForm = new FormGroup({
      'taskListName': new FormControl(null, Validators.required),
      'taskDescription': new FormControl(null, Validators.required),
    });

  }

  onSubmit() {
    this.taskCompletedFlag = !this.taskCompletedFlag;
    console.log(this.addTaskForm);
    const taskID = this.tasksService.getTaskId();
    const taskName = this.addTaskForm.value['taskDescription'];
    const listID = this.addTaskForm.value['taskListName'];
    this.tasksService.addTask(
      new Task(taskID, taskName, listID)
    );
  }

}
