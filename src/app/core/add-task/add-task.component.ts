import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  showFormFlag = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addTaskForm = this.fb.group({
      'taskName': ['', Validators.required]
    });
  }

  onAddTaskBtn() {
    this.showFormFlag = !this.showFormFlag;
  }

  onSubmitAddTask() {
    console.log(this.addTaskForm);
  }

  onCloseBtn() {
    this.showFormFlag = !this.showFormFlag;
  }
}
