// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "inker-19943.firebaseapp.com",
  projectId: "inker-19943",
  storageBucket: "inker-19943.appspot.com",
  messagingSenderId: "503912934578",
  appId: "1:503912934578:web:8eb25bcc7f1eb925272dab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);