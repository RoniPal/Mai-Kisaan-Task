import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLEpYFeeFVSD83Ez8wP9k40ItNASyfloA",
  authDomain: "mai-kisaan.firebaseapp.com",
  projectId: "362903418458",
  storageBucket: "362903418458.appspot.com",
  messagingSenderId: "362903418458",
  appId: "1:362903418458:android:3ee78055764958c1214a63",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
