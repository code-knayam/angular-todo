export class Task {
  id: string;
  name: string;
  completed: boolean;
  dateCreated: Date;

  constructor(id: string, name: string, completed: boolean) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.dateCreated = new Date();
  }
 }
