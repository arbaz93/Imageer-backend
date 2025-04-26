require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
