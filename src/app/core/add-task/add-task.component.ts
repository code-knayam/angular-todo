import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from './../task.model';
import { SharedService } from '../shared.service';

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
    private taskService: TaskService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.initForm();
    this.sharedService.addTaskFormFlag.subscribe(
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

    const taskName = this.addTaskForm.value['taskName'];
    this.taskService.saveNewTask(taskName);
    this.resetAddTaskForm();
  }

  onCloseBtn() {
    this.resetAddTaskForm();
  }

  onToggleFormOptions() {
    this.showFormOptions = !this.showFormOptions;
  }

  resetAddTaskForm() {
    this.addTaskForm.reset();
    this.sharedService.toggleAddTaskForm(false);
    this.showFormOptions = false;
  }
}
