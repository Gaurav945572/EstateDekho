// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homespace-58d8a.firebaseapp.com",
  projectId: "homespace-58d8a",
  storageBucket: "homespace-58d8a.appspot.com",
  messagingSenderId: "121785974895",
  appId: "1:121785974895:web:0406c6710d777c60934d9a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);