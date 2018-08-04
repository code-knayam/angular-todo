import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  showFormFlag = false;
  showFormOptions = false;

  constructor(private fb: FormBuilder,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.initForm();    this.taskService.addTaskFormFlag.subscribe(
      (showFormFlag: boolean) => {
        this.showFormFlag = showFormFlag;
      }
    );
  }

  initForm() {
    this.addTaskForm = this.fb.group({
      'taskName': ['', Validators.required]
    });
  }

  onSubmitAddTask() {
    console.log(this.addTaskForm);
    this.showFormFlag = false;
    this.showFormOptions = false;
  }

  onCloseBtn() {
    this.showFormFlag = false;
    this.showFormOptions = false;
  }

  onToggleFormOptions() {
    this.showFormOptions = !this.showFormOptions;
  }
}
