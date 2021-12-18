// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOOcycISt18qljIVvnpa9_JTgLBK_NWyI",
  authDomain: "e-commerce-admin-f4a12.firebaseapp.com",
  projectId: "e-commerce-admin-f4a12",
  storageBucket: "e-commerce-admin-f4a12.appspot.com",
  messagingSenderId: "705560690273",
  appId: "1:705560690273:web:8de62b0a44ca1bf3efb420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app