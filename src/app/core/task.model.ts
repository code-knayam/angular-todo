export class Task {
  public taskID: string;
  public taskName: string;
  public listID: string;

  constructor(taskID: string, taskName: string, listID: string) {
    this.taskID = taskID;
    this.taskName = taskName;
    this.listID = listID;
  }
}
