import firebase from "firebase";

var firebaseConfig = {
  apiKey: "Your API KEY",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
