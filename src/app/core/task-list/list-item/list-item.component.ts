import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { Task } from '../../task.model';
import { TaskList } from '../../taskList.model';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input('taskList') taskList: TaskList;
  tasks: Task[];
  editMode = false;
  editListNameForm: FormGroup;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.editListNameForm = new FormGroup({
      'editListName': new FormControl()
    });
  }

  onEditListName() {
    if (this.editMode) {
      console.log(this.editListNameForm.value['editListName']);
    }

    this.editMode = !this.editMode;
  }

  onMarkTaskComplete(task: Task) {
    task.completedStatus = !task.completedStatus;
  }

}
