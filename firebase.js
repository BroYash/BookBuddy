import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC59TB6jYcXvcUlYpBREyWZbAr8pxrTgx0",
  authDomain: "bookbuddy-56877.firebaseapp.com",
  projectId: "bookbuddy-56877",
  storageBucket: "bookbuddy-56877.appspot.com",
  messagingSenderId: "381256969322",
  appId: "1:381256969322:web:985a48a2ab0baedb3bae13",
  measurementId: "G-D2LWZFP2X8",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
