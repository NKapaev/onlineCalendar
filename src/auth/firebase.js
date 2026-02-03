import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeb1FjX9UIdFDrILzv4hpk6dOEk0fMAn8",
  authDomain: "webcalendar-a772e.firebaseapp.com",
  projectId: "webcalendar-a772e",
  storageBucket: "webcalendar-a772e.firebasestorage.app",
  messagingSenderId: "969388001998",
  appId: "1:969388001998:web:a2fac55405cfa91475de9f",
  measurementId: "G-0DMXCGKTVH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
