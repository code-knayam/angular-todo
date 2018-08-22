import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  editListForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editListForm = this.fb.group({
      listName: [this.taskService.activeList.list_name, Validators.required]
    });
  }

  onSubmitEditList() {
    console.log('[EditListComponent] Edit List Form ->', this.editListForm
    );
    const listName = this.editListForm.value['listName'];
    // creating new list
    if (listName !== '') {
      this.taskService.renameTaskList(listName);
      // resetting form and navigating
      this.onCloseBtn();
    }
  }

  onCloseBtn() {
    // resetting form and navigating to home page
    this.resetEditListForm();
    this.router.navigate(['']);
  }

  resetEditListForm() {
    this.editListForm.reset();
  }
}
