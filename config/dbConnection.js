var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCB3nT5Gy6SSSG16p2PE3Ipy19dOmXqptU",
    authDomain: "previsao-423b0.firebaseapp.com",
    databaseURL: "https://previsao-423b0.firebaseio.com",
    projectId: "previsao-423b0",
    storageBucket: "previsao-423b0.appspot.com",
    messagingSenderId: "835470148594"
  };
  firebase.initializeApp(config);

module.exports = firebase;