// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAuXUnZfF--vUoJ4TV5WpSjD4Zl3st220",
  authDomain: "taller-react-bp.firebaseapp.com",
  projectId: "taller-react-bp",
  storageBucket: "taller-react-bp.appspot.com",
  messagingSenderId: "499802033130",
  appId: "1:499802033130:web:a50b39ec57aad7635d8093"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}