// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdDsGeKzli6zY7XpKfjHBqZ5nGl0Upc6Q",
  authDomain: "bwtry-8ea4c.firebaseapp.com",
  projectId: "bwtry-8ea4c",
  storageBucket: "bwtry-8ea4c.appspot.com",
  messagingSenderId: "297773721457",
  appId: "1:297773721457:web:5d43598222ce52390af8d0",
  measurementId: "G-53XW5VXB50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
