// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHF_myb9kY7BP1oOqXotk6LsvkUDl5GNg",
  authDomain: "relator-clone-ab9c8.firebaseapp.com",
  projectId: "relator-clone-ab9c8",
  storageBucket: "relator-clone-ab9c8.appspot.com",
  messagingSenderId: "580504719944",
  appId: "1:580504719944:web:6de683624e408590ef3e7d",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
