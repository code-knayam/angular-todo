export class Task {
  id: string;
  name: string;
  completed: boolean;
  dateCreated: Date;
  dateCompleted: Date;

  constructor(id: string, name: string, completed: boolean, dateCreated: Date, dateCompleted: Date) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
  }
 }
