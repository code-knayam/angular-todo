const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getUserInfo = functions.https.onRequest(
  (req, res) => {
    var db = admin.firestore();
    var userId = req.query.userid;

    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    db.collection('user-data').doc(userId).get().then(
      (doc) => {
        var userData = doc.data();
        userData['user_id'] = doc.id;
        res.send(userData);
        return "";
      }
    ).catch(
      (err) => {
        res.send(err);
      });
  }
);

exports.getUserLists = functions.https.onRequest(
  (req, res) => {
    var userId = req.query.userid;
    var db = admin.firestore();
    db.collection('user-data').doc(userId).collection('lists_arr').get().then(
      (querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          var listData = doc.data();
          listData['list_id'] = doc.id;
          data.push(listData);
        });
        res.send(data);
        return "";
      }
    ).catch(
      (err) => {
        res.send(err);
      });
  }
);

exports.getUserTasks = functions.https.onRequest(
  (req, res) => {
    var userId = req.query.userid;
    var listId = req.query.listid;
    var db = admin.firestore();
    db.collection('user-data').doc(userId).collection('lists_arr').doc(listId).collection('tasks_arr').get().then(
      (querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          var taskData = doc.data();
          taskData['task_id'] = doc.id;
          data.push(taskData);
        });
        res.send(data);
        return "";
      }
    ).catch(
      (err) => {
        res.send(err);
      });
  }
);
