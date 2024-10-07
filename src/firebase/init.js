/* eslint-disable no-unused-vars */
// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCBOzN_uSvo6S5Gg54wzagsu3D5xej05rQ",
  authDomain: "week7-yalin.firebaseapp.com",
  projectId: "week7-yalin",
  storageBucket: "week7-yalin.appspot.com",
  messagingSenderId: "293371232535",
  appId: "1:293371232535:web:9206b69b2c3537dda4b752",
  measurementId: "G-50BD99LF7D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
export default db