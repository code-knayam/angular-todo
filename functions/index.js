const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Used to create new user in the database with a startup list
// Called at time of user login / signup
// RETURNS JSON object containing success code and message
exports.createUserAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var username = req.query.username;

  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  db.collection("user-data")
    .doc(userId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        db.collection("user-data")
          .doc(userId)
          .set({
            username: username
          });
        return db
          .collection("user-data")
          .doc(userId)
          .collection("lists-arr")
          .add({
            list_name: "Today's Task"
          });
      }
      res.send({ code: 200, status: "User Profile exists" });
      return "";
    })
    .then(() => {
      res.send({ code: 200, status: "User profile created" });
      return "";
    })
    .catch(err => {
      res.send(err);
    });
});

// Used to create user details object containing user lists and their tasks
// Called at time of core component load
// RETURNS JSON object containing list array with tasks
exports.userDetailsAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var userDetailsApiResponse = {};

  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  db.collection("user-data")
    .doc(userId)
    .get()
    .then(docRef => {
      if (docRef.exists) {
        userDetailsApiResponse["code"] = 200;
        userDetailsApiResponse["username"] = docRef.data().username;
        userDetailsApiResponse["email"] = docRef.id;
        userDetailsApiResponse["lists_arr"] = [];
      } else {
        throw new Error("user doesn't exist");
      }
      return "";
    })
    .then(() => {
      return db
        .collection("user-data")
        .doc(userId)
        .collection("lists-arr")
        .get();
    })
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        var listData = doc.data();
        listData["list_id"] = doc.id;
        userDetailsApiResponse.lists_arr.push(listData);
      });
      res.send(userDetailsApiResponse);
      return "";
    })
    .catch(err => {
      res.send(err);
    });
});

exports.getTasksFromListAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var listId = req.query.listid;
  var tasksAPIResponse = {tasks_arr: []};

  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  db.collection("user-data")
    .doc(userId)
    .collection("lists-arr")
    .doc(listId)
    .collection("tasks-arr")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(docRef => {
        var taskData = docRef.data();
        taskData["task_id"] = docRef.id;
        tasksAPIResponse.tasks_arr.push(taskData);
      });
      res.send(tasksAPIResponse);
      return "";
    })
    .catch(err => {
      res.send(err);
    });
});
