import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEfwlhK5JqriswCo5S0x9JkCxjiwHyjAk",
  authDomain: "capstone-40568.firebaseapp.com",
  projectId: "capstone-40568",
  storageBucket: "capstone-40568.appspot.com",
  messagingSenderId: "962687304131",
  appId: "1:962687304131:web:0cc3ba8631ab137c013d76",
  measurementId: "G-12XXSV4LHE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const db = getFirestore(app);
