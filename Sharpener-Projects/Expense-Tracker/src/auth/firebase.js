// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzeoPNNSxQIkW6oaxQEFnBR5EzGAfkXmA",
  authDomain: "expense-tracker-d7630.firebaseapp.com",
  projectId: "expense-tracker-d7630",
  storageBucket: "expense-tracker-d7630.appspot.com",
  messagingSenderId: "675866649766",
  appId: "1:675866649766:web:92990b8e0fdb0b0a930067",
  databaseURL: "https://expense-tracker-d7630-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
