// Firebase
const admin = require("firebase-admin");
// SDK
const serviceAccount = require("../storages/firebase/jubetech-admin-sdk.json");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET
});

module.exports = admin;