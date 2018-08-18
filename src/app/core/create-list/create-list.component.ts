import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  createListForm: FormGroup;
  createNewListFormFlag: boolean;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createListForm = this.fb.group({
      'listName': ['', Validators.required]
    });
  }

  onSubmitCreateList() {
    console.log(this.createListForm);
    const listName = this.createListForm.value['listName'];
    // creating new list
    this.taskService.createNewList(listName);
    // resetting form and navigating
    this.onCloseBtn();
  }

  onCloseBtn() {
    // resetting form and navigating to home page
    this.resetCreateListForm();
    this.router.navigate(['']);
  }

  resetCreateListForm() {
    this.createListForm.reset();
  }

}
