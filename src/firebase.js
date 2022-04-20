// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmrg-30ywSP3pcbXNmkB7RzymU1_6LYXU",
  authDomain: "crud-basico-react-bp-a5693.firebaseapp.com",
  projectId: "crud-basico-react-bp-a5693",
  storageBucket: "crud-basico-react-bp-a5693.appspot.com",
  messagingSenderId: "216301153924",
  appId: "1:216301153924:web:df4b53e46677e9f75cdcd1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}