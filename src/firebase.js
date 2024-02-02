
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJYPnVLiESCT91DAQYZhUkEc9qh2nM7Q8",
  authDomain: "weather-dashboard-42822.firebaseapp.com",
  projectId: "weather-dashboard-42822",
  storageBucket: "weather-dashboard-42822.appspot.com",
  messagingSenderId: "946710805025",
  appId: "1:946710805025:web:b3b30f79b414d00cebc160",
  measurementId: "G-LD0LFBZ06L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);