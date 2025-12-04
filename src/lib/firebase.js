import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtpV6y0ySjkGWQMgBeJUO2cw3XRzJfikY",
    authDomain: "gdgocmanager.firebaseapp.com",
    projectId: "gdgocmanager",
    storageBucket: "gdgocmanager.firebasestorage.app",
    messagingSenderId: "683099725894",
    appId: "1:683099725894:web:2753a2a0bff39a8d97ea47",
    measurementId: "G-PXTGDV9S6G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);