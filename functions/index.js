const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getUserInfo = functions.https.onRequest(
	(req, res) => {
		var db = admin.firestore();
		db.collection('user-data').get().then(
			(querySnapshot) => {
				var data = [];
				querySnapshot.forEach((doc) => {
					data.push(doc.data());
				});
				res.send(data);
				return "";
			}
		).catch(
			(err) => {
				res.send(err);
			});
	}
)
