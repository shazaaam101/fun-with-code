import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABbSv7vot0pzTxFaaqMXUXtyLAfUUUPxo",
  authDomain: "fun-with-code-9fcd6.firebaseapp.com",
  projectId: "fun-with-code-9fcd6",
  storageBucket: "fun-with-code-9fcd6.appspot.com",
  messagingSenderId: "453130946390",
  appId: "1:453130946390:web:77df7920c703f96579b8f7",
  measurementId: "G-HE61XD8GX6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
