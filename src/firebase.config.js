// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg5WK4dnYlGwdyd7FD0gWF__6nmKGUD-Q",
    authDomain: "house-marketplace-app-96f9d.firebaseapp.com",
    projectId: "house-marketplace-app-96f9d",
    storageBucket: "house-marketplace-app-96f9d.appspot.com",
    messagingSenderId: "856329622952",
    appId: "1:856329622952:web:7f1b529a0041a99b29399d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()