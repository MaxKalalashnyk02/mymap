import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALQGZ2IQdMda7c99XJq9xIbSvxb0BduQs",
  authDomain: "maptt-421220.firebaseapp.com",
  projectId: "maptt-421220",
  storageBucket: "maptt-421220.appspot.com",
  messagingSenderId: "473313179775",
  appId: "1:473313179775:web:2854bfde82311590cf674a",
  measurementId: "G-N8HDKRVGX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 