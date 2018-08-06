export class Task {
  name: string;
  completed: boolean;
  dateCreated: Date;

  constructor(name: string) {
    this.name = name;
    this.completed = false;
    this.dateCreated = new Date();
  }
}
