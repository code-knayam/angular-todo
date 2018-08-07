export class Task {
  name: string;
  completed: boolean;
  dateCreated: Date;

  constructor(name: string, completed: boolean, date: Date) {
    this.name = name;
    this.completed = completed;
    this.dateCreated = date;
  }
}
