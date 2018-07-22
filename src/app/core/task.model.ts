import * as CONSTANTS from '../CONSTANTS';

export class Task {
  public taskID: string;
  public taskName: string;
  public listID: string;
  public completedStatus: boolean;

  constructor(taskID: string, taskName: string, listID: string) {
    this.taskID = taskID;
    this.taskName = taskName;
    this.listID = listID;
    this.completedStatus = false;
  }
}
