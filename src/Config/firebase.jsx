// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB8pmwT-BqCwkWTTtrwcV5AP5_PY8HV-Aw",
  authDomain: "real-e8644.firebaseapp.com",
  projectId: "real-e8644",
  storageBucket: "real-e8644.firebasestorage.app",
  messagingSenderId: "310563251381",
  appId: "1:310563251381:web:6824a70c5d24c304f64afc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)