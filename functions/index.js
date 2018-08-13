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
      res.send({ status: 200, msg: "User Profile exists" });
      return "";
    })
    .then(() => {
      res.send({ status: 200, msg: "User profile created" });
      return "";
    })
    .catch(err => {
      res.send(err);
    });
});

// Used to create user details object containing user lists and their tasks
// Called at time of core component load
// RETURNS JSON object containing list array
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
        userDetailsApiResponse["status"] = 200;
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

// Used to fetch tasks for a particular list and user id
// RETURNS JSON object containing tasks_arr with tasks details
exports.getTasksFromListAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var listId = req.query.listid;
  var tasksAPIResponse = { tasks_arr: [] };

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
      tasksAPIResponse["status"] = 200;
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

// Used to update completed status of a task
// Uses UserId, listId, taskId and the new status
// RETURNS JSON object containing success code, and msg
exports.updateTaskStatusAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var listId = req.query.listid;
  var taskId = req.query.taskid;
  var status = req.query.status;

  db.collection("user-data")
    .doc(userId)
    .collection("lists-arr")
    .doc(listId)
    .collection("tasks-arr")
    .doc(taskId)
    .update({
      completed_status: status
    }).then(
      () => {
        res.send({ status: 200, msg: "Tasks Updated Successfully!" });
        return "";
      }
    ).catch(err => {
      res.send(err);
    });
});

// Used to add a new task to a list
// Uses UserId, listId and the new task details (name)
// RETURNS JSON object containing success code, taskId and msg
exports.addTaskAPI = functions.https.onRequest((req, res) => {
  var db = admin.firestore();
  var userId = req.query.userid;
  var listId = req.query.listid;
  var taskName = req.query.taskname;

  db.collection("user-data")
    .doc(userId)
    .collection("lists-arr")
    .doc(listId)
    .collection("tasks-arr")
    .add({
      task_name: taskName,
      completed_status: false,
      date_created: new Date()
    })
    .then(
    (docRef) => {
      res.send({status: 200, task_id: docRef.id, msg: "Task Added Successfully!"});
      return "";
    }
  ).catch(err => {
    res.send(err);
  })
});
