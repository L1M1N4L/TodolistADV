// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Then add after your other initializations:

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbQxApt1v2mJ3EE2q2dZcxoq0sic5l7Fo",
  authDomain: "todolist-8d003.firebaseapp.com",
  projectId: "todolist-8d003",
  storageBucket: "todolist-8d003.firebasestorage.app",
  messagingSenderId: "420297605436",
  appId: "1:420297605436:web:27e9bf6305e2b9c19f1e39",
  measurementId: "G-J4T78X3CZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);