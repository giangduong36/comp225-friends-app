const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNI73KjeLQ6Vv8TWGL8F_6-AV7orI8WYE",
    authDomain: "friend-225.firebaseapp.com",
    databaseURL: "https://friend-225.firebaseio.com",
    storageBucket: "friend-225.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp;