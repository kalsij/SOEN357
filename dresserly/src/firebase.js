// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_dgsIRVf6bZve1fbzR-jMJs6doYedf9Y",
  authDomain: "dresserly.firebaseapp.com",
  projectId: "dresserly",
  storageBucket: "dresserly.appspot.com",
  messagingSenderId: "520035431252",
  appId: "1:520035431252:web:42e4df72f5b0dc374acec1",
  measurementId: "G-Z8E4HQL8QR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
