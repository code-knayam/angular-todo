import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from './../task.model';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  showFormFlag: boolean;
  showFormOptions = false;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addTaskForm = this.fb.group({
      'taskName': ['', Validators.required]
    });
  }

  onSubmitAddTask() {
    console.log(this.addTaskForm);

    const taskName = this.addTaskForm.value['taskName'];
    this.taskService.saveNewTask(taskName);
    this.onCloseBtn();
  }

  onCloseBtn() {
    this.resetAddTaskForm();
    this.router.navigate(['']);
  }

  onToggleFormOptions() {
    this.showFormOptions = !this.showFormOptions;
  }

  resetAddTaskForm() {
    this.addTaskForm.reset();
    this.showFormOptions = false;
  }
}
