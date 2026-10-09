// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpI0T3rIYKKhiBkordqqiVNby-nhDdbSk",
  authDomain: "conexaosuassuna-2006a.firebaseapp.com",
  projectId: "conexaosuassuna-2006a",
  storageBucket: "conexaosuassuna-2006a.firebasestorage.app",
  messagingSenderId: "842363778323",
  appId: "1:842363778323:web:2a1ea09b6540d0800556e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);