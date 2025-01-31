// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVdoyzzYUIzgBdjKqU0Es9AguXwo-r8WE",
  authDomain: "new-project-c0754.firebaseapp.com",
  projectId: "new-project-c0754",
  storageBucket: "new-project-c0754.firebasestorage.app",
  messagingSenderId: "111629958118",
  appId: "1:111629958118:web:c4325dc204d09cf80bf427",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
