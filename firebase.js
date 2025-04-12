import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWhGLiE8fYqCF6r1ttMHvDr50jOpPMWxA",
    authDomain: "financeempire-84524.firebaseapp.com",
    projectId: "financeempire-84524",
    storageBucket: "financeempire-84524.appspot.com",
    messagingSenderId: "24004163444",
    appId: "1:24004163444:web:e6046100eadc42e6429e21",
    measurementId: "G-M2NKWTT4YN"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
