import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZt8BEmCLly9lsK4-Uj_3QW5s9AXiAaHM",
  authDomain: "mydb-c4027.firebaseapp.com",
  projectId: "mydb-c4027",
  storageBucket: "mydb-c4027.appspot.com",
  messagingSenderId: "151454075469",
  appId: "1:151454075469:web:07413536c895731e2bea04",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
