// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMlFLs9NoMLPDbvOUyD9CD3NyPX70gUs8",
  authDomain: "mysmartlist-aa044.firebaseapp.com",
  projectId: "mysmartlist-aa044",
  storageBucket: "mysmartlist-aa044.appspot.com",
  messagingSenderId: "834661771997",
  appId: "1:834661771997:web:0b38514fb51322c82b4934",
  measurementId: "G-SW67RQTDSF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireStoreDb = getFirestore(app);
