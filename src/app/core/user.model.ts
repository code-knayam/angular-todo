export class User {
  userName: string;
  email: string;
  photoUrl: string;

  constructor(userName: string, email: string, photoUrl: string) {
    this.userName = userName;
    this.email = email;
    this.photoUrl = photoUrl;
  }
}
