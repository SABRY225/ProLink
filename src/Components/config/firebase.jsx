// src/firebase.js
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCFUb5PaW7DeKzp8m7MlMDKh82Mr40cqgo",
    authDomain: "prolink-db340.firebaseapp.com",
    projectId: "prolink-db340",
    storageBucket: "prolink-db340.appspot.com",
    messagingSenderId: "995292641230",
    appId: "1:995292641230:web:59a8e644358ea6848f5d9f",
    measurementId: "G-9XE864K6EK"
  };
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
