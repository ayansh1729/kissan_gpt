// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJXD4OQsxwRuUbK1U4SewkZpWv0eYpG6Y",
  authDomain: "kissan-23af4.firebaseapp.com",
  projectId: "kissan-23af4",
  storageBucket: "kissan-23af4.appspot.com",
  messagingSenderId: "425470770500",
  appId: "1:425470770500:web:4ca72c241d885a6976ab11",
  measurementId: "G-6JNC5YSB9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export default db;