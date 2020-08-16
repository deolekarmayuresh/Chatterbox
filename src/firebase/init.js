import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAjCKqM8NvSVHznBcq2kH_7Fm0HWvEMWFo",
    authDomain: "my-chatterbox.firebaseapp.com",
    databaseURL: "https://my-chatterbox.firebaseio.com",
    projectId: "my-chatterbox",
    storageBucket: "my-chatterbox.appspot.com",
    messagingSenderId: "1042592532740",
    appId: "1:1042592532740:web:7e810e5e413cffec1c6851",
    measurementId: "G-071WL4V2Q8"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseeApp.firestore()