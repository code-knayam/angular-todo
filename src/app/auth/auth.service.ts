import * as firebase from 'firebase';

export class AuthService {

  signInUser() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
      (result) => {
        // const token = result.credential.accessToken;
        const user = result.user;
        console.log(result);
        console.log(result.user);
      }
    ).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });

  }
}
