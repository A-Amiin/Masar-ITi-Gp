import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZo0naK8i4mLbyHi6nCtP453cFSE6lQSo",
  authDomain: "itiproject-ba6ab.firebaseapp.com",
  databaseURL: "https://itiproject-ba6ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "itiproject-ba6ab",
  storageBucket: "itiproject-ba6ab.firebasestorage.app",
  messagingSenderId: "1050995001056",
  appId: "1:1050995001056:web:f79a26f3cf9908b5953285",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;