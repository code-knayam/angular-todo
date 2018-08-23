import { Component, OnInit, Input } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTaskForm: FormGroup;
  task: Task;

  constructor(private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService) { }

  ngOnInit() {
    this.task = this.taskService.getTaskToBeEdited();
    if (this.task === null) {
      this.router.navigate(['']);
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.editTaskForm = this.fb.group({
      taskName: [this.task.name, Validators.required]
    });
  }

  onSubmitEditTask() {
    console.log('[EditTaskComponent] Edit Task Form -> ', this.editTaskForm);
    const taskName = this.editTaskForm.value['taskName'];
    this.onCloseBtn();
  }

  onDeleteTaskBtn() {
    this.taskService.deleteTask(this.task);
    this.onCloseBtn();
  }

  onCloseBtn() {
    this.taskService.setTaskToBeEdited(null);
    this.router.navigate(['']);
  }

}
