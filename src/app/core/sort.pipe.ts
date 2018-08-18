import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(tasks: Task[], sortBy?: string) {
    tasks.sort(
      (a: Task, b: Task) => {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        } else if (a[sortBy] < b[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      }
    );
    console.log('post sort', tasks);
    return tasks;
  }

}
