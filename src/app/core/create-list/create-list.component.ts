import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  createListForm: FormGroup;
  createNewListFormFlag: boolean;

  constructor(private fb: FormBuilder, private taskService: TaskService, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.createNewListFormSubject.subscribe(
      (flag: boolean) => {
        this.createNewListFormFlag = flag;
      }
    );
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
    this.taskService.createNewList(listName);
    this.sharedService.toggleCreateNewListForm(false);
    this.sharedService.toggleMenu(false);
    this.resetCreateListForm();
  }

  onCloseBtn() {
    this.resetCreateListForm();
    this.sharedService.toggleCreateNewListForm(false);
    this.sharedService.toggleMenu(false);
  }

  resetCreateListForm() {
    this.createListForm.reset();
  }

}
