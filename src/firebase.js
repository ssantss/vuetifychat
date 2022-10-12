import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg9wLTwh9P5uUgE4Vi9vSC3DBAEEuQZzE",
  authDomain: "vuetifychat-21803.firebaseapp.com",
  projectId: "vuetifychat-21803",
  storageBucket: "vuetifychat-21803.appspot.com",
  messagingSenderId: "915166172328",
  appId: "1:915166172328:web:7bcfa1583744ae4e299e9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
