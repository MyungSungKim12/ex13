// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJr67xko8t71pPux2xXxD_NKiUG2ghb3I",
  authDomain: "fir-fe795.firebaseapp.com",
  projectId: "fir-fe795",
  storageBucket: "fir-fe795.appspot.com",
  messagingSenderId: "598154842159",
  appId: "1:598154842159:web:3f969f7676841f8adf36da",
  measurementId: "G-FBX9388064"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);