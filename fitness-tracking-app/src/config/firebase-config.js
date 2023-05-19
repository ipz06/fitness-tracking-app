import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAVqZ31WP_K_85DQ0696snLt5GaPoLeO74",
  authDomain: "fitness-tracking-app-b6ae4.firebaseapp.com",
  projectId: "fitness-tracking-app-b6ae4",
  storageBucket: "fitness-tracking-app-b6ae4.appspot.com",
  messagingSenderId: "812328552255",
  appId: "1:812328552255:web:ff5c03a182c676c67c358a",
  databaseURL: "https://fitness-tracking-app-b6ae4-default-rtdb.europe-west1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);