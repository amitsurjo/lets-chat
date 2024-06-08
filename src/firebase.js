// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZe0PE8mVqOYIJI9GjdJqeVEEILWNq9mo",
  authDomain: "lets-chat-7b21c.firebaseapp.com",
  projectId: "lets-chat-7b21c",
  storageBucket: "lets-chat-7b21c.appspot.com",
  messagingSenderId: "467704206202",
  appId: "1:467704206202:web:8714a3a81657056cb33cc3",
  measurementId: "G-4809GVY1L1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
