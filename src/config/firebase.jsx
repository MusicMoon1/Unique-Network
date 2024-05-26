// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHx5WwdXaUlYnYk2O3PwhMBWK3pfT7ZY4",
  authDomain: "musicmoon.firebaseapp.com",
  projectId: "musicmoon",
  storageBucket: "musicmoon.appspot.com",
  messagingSenderId: "944721918673",
  appId: "1:944721918673:web:8fe03c782ae903365aa3f0"
};


const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, firestore, database, storage }