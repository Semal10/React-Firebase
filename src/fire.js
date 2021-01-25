import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC7llHDwFs5PJkO_p9i1zLqMNgy-Gxx90w",
  authDomain: "reactauth-d5ad9.firebaseapp.com",
  projectId: "reactauth-d5ad9",
  storageBucket: "reactauth-d5ad9.appspot.com",
  messagingSenderId: "374774375804",
  appId: "1:374774375804:web:950022c8005877b79430f9",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
