// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYoTUA5JEi07iobZSut2SVqUlDyhgOiUE",
  authDomain: "citrenzcms.firebaseapp.com",
  databaseURL: "https://citrenzcms-default-rtdb.firebaseio.com",
  projectId: "citrenzcms",
  storageBucket: "citrenzcms.appspot.com",
  messagingSenderId: "616135209258",
  appId: "1:616135209258:web:5ad841e0c4423bf659ee53",
  measurementId: "G-98CS6HVJ5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getDatabase(app);
